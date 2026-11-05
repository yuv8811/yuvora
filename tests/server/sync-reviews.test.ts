import { describe, it, expect } from 'vitest';
import { parseShopifyAppHtml } from '../../server/scripts/sync-reviews';

describe('Shopify App Store Reviews Parser', () => {
  it('parses aggregateRating and reviews from JSON-LD script', () => {
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <script type="application/ld+json">
            {
              "@context": "http://schema.org",
              "@type": "SoftwareApplication",
              "name": "Reviora - Product Reviews",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": 342
              },
              "review": [
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Nordic Apparel" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                  "reviewBody": "Incredible app! Our review submission rate jumped 40% in two weeks.",
                  "datePublished": "2026-03-12"
                }
              ]
            }
          </script>
        </head>
      </html>
    `;

    const parsed = parseShopifyAppHtml(mockHtml);
    expect(parsed.rating).toBe(4.9);
    expect(parsed.ratingCount).toBe(342);
    expect(parsed.reviews).toHaveLength(1);
    expect(parsed.reviews?.[0].author).toBe('Nordic Apparel');
    expect(parsed.reviews?.[0].rating).toBe(5);
    expect(parsed.reviews?.[0].body).toContain('Incredible app!');
  });

  it('parses fallback DOM elements if JSON-LD is missing', () => {
    const mockHtml = `
      <div class="ui-star-rating__rating">4.8</div>
      <div class="review-summary">290 total reviews</div>
    `;

    const parsed = parseShopifyAppHtml(mockHtml);
    expect(parsed.rating).toBe(4.8);
    expect(parsed.ratingCount).toBe(290);
  });
});

