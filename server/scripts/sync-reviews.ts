import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { App, AppsListSchema, AppReview } from '../../shared/schemas/app.schema';
import { appsService } from '../services/apps.service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appsFilePath = path.resolve(__dirname, '../data/apps.json');

interface ScrapedReviewData {
  rating?: number;
  ratingCount?: number;
  reviews?: AppReview[];
}

/**
 * Parses Shopify App Store HTML for JSON-LD and HTML review elements.
 */
export function parseShopifyAppHtml(html: string): ScrapedReviewData {
  const result: ScrapedReviewData = {};

  // 1. Check all JSON-LD script blocks
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1].trim());
      const items = Array.isArray(data) ? data : [data];

      for (const item of items) {
        if (item.aggregateRating) {
          const rawRating = parseFloat(item.aggregateRating.ratingValue);
          const rawCount = parseInt(item.aggregateRating.reviewCount, 10);
          if (!isNaN(rawRating)) result.rating = Number(rawRating.toFixed(1));
          if (!isNaN(rawCount)) result.ratingCount = rawCount;
        }

        if (Array.isArray(item.review) && item.review.length > 0) {
          result.reviews = item.review.map((r: Record<string, unknown>, idx: number) => {
            const author = typeof r.author === 'object' && r.author && 'name' in r.author
              ? String((r.author as { name: string }).name)
              : 'Verified Merchant';
            const ratingVal = typeof r.reviewRating === 'object' && r.reviewRating && 'ratingValue' in r.reviewRating
              ? Number((r.reviewRating as { ratingValue: string | number }).ratingValue)
              : 5;
            return {
              id: `review-${idx + 1}`,
              author,
              rating: Math.min(5, Math.max(1, Math.round(ratingVal))),
              body: String(r.reviewBody || '').trim(),
              date: String(r.datePublished || new Date().toISOString().split('T')[0]),
            };
          });
        }
      }
    } catch {
      // Ignore JSON parse errors in non-standard blocks
    }
  }

  // 2. HTML Fallback: Extract rating and review count from DOM markup if JSON-LD was omitted
  if (!result.rating) {
    const ratingMatch = html.match(/class=["'][^"']*ui-star-rating__rating[^"']*["'][^>]*>([\d.]+)/i)
      || html.match(/aria-label=["']([\d.]+)\s*out of 5 stars["']/i);
    if (ratingMatch) {
      const parsed = parseFloat(ratingMatch[1]);
      if (!isNaN(parsed)) result.rating = parsed;
    }
  }

  if (!result.ratingCount) {
    const countMatch = html.match(/([\d,]+)\s*(?:total\s*)?reviews/i);
    if (countMatch) {
      const count = parseInt(countMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(count)) result.ratingCount = count;
    }
  }

  return result;
}

/**
 * Fetches live review data from a Shopify App Store page.
 */
async function fetchAppStoreReviews(url: string): Promise<ScrapedReviewData | null> {
  // If it's a placeholder URL, skip live fetch
  if (url.includes('placeholder-') || !url.startsWith('https://apps.shopify.com/')) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`  ⚠️ Shopify App Store returned HTTP ${response.status} for ${url}`);
      return null;
    }

    const html = await response.text();
    return parseShopifyAppHtml(html);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`  ⚠️ Could not reach Shopify App Store (${message}). Network check skipped.`);
    return null;
  }
}

/**
 * Main execution script - can be called standalone or imported by server on startup
 */
export async function syncReviews(options: { isStandalone?: boolean } = {}): Promise<number> {
  const isStandalone = options.isStandalone ?? false;
  console.log('\n🔄 [Yuvora] Starting Shopify App Store Review Sync...\n');

  if (!fs.existsSync(appsFilePath)) {
    console.error(`❌ Error: apps.json not found at ${appsFilePath}`);
    if (isStandalone) process.exit(1);
    return 0;
  }

  const raw = fs.readFileSync(appsFilePath, 'utf-8');
  let apps: App[];
  try {
    apps = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Error parsing apps.json: ${message}`);
    if (isStandalone) process.exit(1);
    return 0;
  }

  let updatedCount = 0;

  for (const app of apps) {
    console.log(`📦 Checking "${app.name}" (${app.slug})...`);
    console.log(`   URL: ${app.shopifyAppStoreUrl}`);

    if (app.shopifyAppStoreUrl.includes('placeholder-')) {
      console.log(`   ℹ️ App is using a placeholder URL. Update "shopifyAppStoreUrl" in apps.json with your live listing.`);
      console.log(`   Current stats retained: ★ ${app.rating} (${app.ratingCount.toLocaleString()} reviews)\n`);
      continue;
    }

    const scraped = await fetchAppStoreReviews(app.shopifyAppStoreUrl);

    if (scraped && (scraped.rating || scraped.ratingCount || scraped.reviews)) {
      let changed = false;
      if (scraped.rating !== undefined && scraped.rating !== app.rating) {
        console.log(`   ✓ Updated rating: ${app.rating} -> ${scraped.rating}`);
        app.rating = scraped.rating;
        changed = true;
      }
      if (scraped.ratingCount !== undefined && scraped.ratingCount !== app.ratingCount) {
        console.log(`   ✓ Updated review count: ${app.ratingCount} -> ${scraped.ratingCount}`);
        app.ratingCount = scraped.ratingCount;
        changed = true;
      }
      if (scraped.reviews && scraped.reviews.length > 0) {
        console.log(`   ✓ Synced ${scraped.reviews.length} merchant reviews`);
        app.reviews = scraped.reviews;
        changed = true;
      }

      if (changed) {
        updatedCount++;
        console.log(`   ✅ App synced successfully.\n`);
      } else {
        console.log(`   ℹ️ Live counts matched current data; no changes needed.\n`);
      }
    } else {
      console.log(`   ℹ️ No remote updates detected; keeping existing data.\n`);
    }
  }

  if (updatedCount > 0) {
    // Validate schema before saving
    const validation = AppsListSchema.safeParse(apps);
    if (!validation.success) {
      console.error('❌ Validation failed after sync:', validation.error.format());
      if (isStandalone) process.exit(1);
      return 0;
    }

    fs.writeFileSync(appsFilePath, JSON.stringify(apps, null, 2) + '\n', 'utf-8');
    appsService.loadAndValidate();
    console.log(`✨ Sync complete! ${updatedCount} app(s) updated in server/data/apps.json.\n`);
  } else {
    console.log(`✨ Review sync check complete. Current review counts are up to date.\n`);
  }

  return updatedCount;
}

// Run only when directly invoked from CLI, not when imported by server or in tests
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncReviews({ isStandalone: true }).catch((err) => {
    console.error('Fatal sync error:', err);
    process.exit(1);
  });
}
