import http from 'http';
import { createServer } from '../server/index';

async function runVerification() {
  console.log('🧪 Starting End-to-End Server Verification...');

  const app = await createServer();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(4001, () => resolve());
  });

  const baseUrl = 'http://localhost:4001';

  async function fetchUrl(path: string, options: { redirect?: 'manual' | 'follow' } = {}) {
    const res = await fetch(`${baseUrl}${path}`, { redirect: options.redirect || 'follow' });
    const text = await res.text();
    return { status: res.status, headers: res.headers, text };
  }

  try {
    // 1. Home route
    console.log('Testing GET / ...');
    const home = await fetchUrl('/');
    if (home.status !== 200 || !home.text.includes('<h1') || !home.text.includes('Reviora')) {
      throw new Error(`Home page verification failed: status ${home.status}`);
    }
    console.log('  ✓ Home page SSR returned 200 with full HTML and app list');

    // 2. Apps listing route
    console.log('Testing GET /apps ...');
    const apps = await fetchUrl('/apps');
    if (apps.status !== 200 || !apps.text.includes('Shopify Apps Built for Unstoppable Conversion')) {
      throw new Error(`Apps page verification failed: status ${apps.status}`);
    }
    console.log('  ✓ Apps listing SSR returned 200 with full HTML');

    // 3. App Detail route
    console.log('Testing GET /apps/reviora ...');
    const appDetail = await fetchUrl('/apps/reviora');
    if (appDetail.status !== 200 || !appDetail.text.includes('Reviora') || !appDetail.text.includes('Starter')) {
      throw new Error(`App detail verification failed: status ${appDetail.status}`);
    }
    console.log('  ✓ App detail SSR returned 200 with pricing table and features');

    // 4. Affiliate route
    console.log('Testing GET /affiliate ...');
    const affiliate = await fetchUrl('/affiliate');
    if (affiliate.status !== 200 || !affiliate.text.includes('Partner with Yuvora') || !affiliate.text.includes('Commission Structure')) {
      throw new Error(`Affiliate page verification failed: status ${affiliate.status}`);
    }
    console.log('  ✓ Affiliate page SSR returned 200 with commission table');

    // 5. Schemes route
    console.log('Testing GET /schemes ...');
    const schemes = await fetchUrl('/schemes');
    if (schemes.status !== 200 || !schemes.text.includes('Startup Accelerator Scheme') || !schemes.text.includes('Compare Partner Schemes')) {
      throw new Error(`Schemes page verification failed: status ${schemes.status}`);
    }
    console.log('  ✓ Schemes page SSR returned 200 with scheme cards & comparison table');

    // 6. Trailing slash 301 redirect
    console.log('Testing GET /apps/ (trailing slash redirect)...');
    const redirectRes = await fetchUrl('/apps/', { redirect: 'manual' });
    if (redirectRes.status !== 301) {
      throw new Error(`Trailing slash did not return 301: status ${redirectRes.status}`);
    }
    console.log('  ✓ Trailing slash correctly returned 301 redirect');

    // 7. Custom 404 status
    console.log('Testing GET /unknown-page (404 status)...');
    const notFound = await fetchUrl('/unknown-page');
    if (notFound.status !== 404 || !notFound.text.includes('404')) {
      throw new Error(`404 page failed: status ${notFound.status}`);
    }
    console.log('  ✓ Non-existent route correctly returned status 404 with custom SSR 404 page');

    // 8. API Endpoints
    console.log('Testing GET /api/apps ...');
    const apiApps = await fetchUrl('/api/apps');
    const apiJson = JSON.parse(apiApps.text);
    if (!apiJson.success || !Array.isArray(apiJson.data) || apiJson.data.length < 2) {
      throw new Error('API /api/apps failed to return published apps list');
    }
    console.log('  ✓ /api/apps returned published apps list with success: true');

    // 9. API single app
    console.log('Testing GET /api/apps/zenspeed ...');
    const apiSingle = await fetchUrl('/api/apps/zenspeed');
    const singleJson = JSON.parse(apiSingle.text);
    if (!singleJson.success || singleJson.data.slug !== 'zenspeed') {
      throw new Error('API /api/apps/:slug failed');
    }
    console.log('  ✓ /api/apps/:slug returned single app');

    // 10. Sitemap XML
    console.log('Testing GET /sitemap.xml ...');
    const sitemap = await fetchUrl('/sitemap.xml');
    if (sitemap.status !== 200 || !sitemap.text.includes('</urlset>') || !sitemap.text.includes('/apps/discount-engine')) {
      throw new Error('Sitemap verification failed');
    }
    console.log('  ✓ /sitemap.xml returned valid XML');

    // 11. Robots TXT
    console.log('Testing GET /robots.txt ...');
    const robots = await fetchUrl('/robots.txt');
    if (robots.status !== 200 || !robots.text.includes('Sitemap:')) {
      throw new Error('Robots.txt verification failed');
    }
    console.log('  ✓ /robots.txt returned valid text referencing sitemap');

    console.log('\n🎉 ALL 11 END-TO-END VERIFICATION CHECKS PASSED PERFECTLY!\n');
  } finally {
    server.close();
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

