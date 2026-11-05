import { appsService } from '../services/apps.service';
import { ROUTES } from '../../shared/constants/routes';
import { SITE_CONFIG } from '../../shared/constants/site';

export function generateSitemapXml(baseUrl: string = SITE_CONFIG.url): string {
  const publishedApps = appsService.getAll();
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: ROUTES.HOME, priority: '1.0', changefreq: 'daily' },
    { loc: ROUTES.APPS, priority: '0.9', changefreq: 'daily' },
    { loc: ROUTES.AFFILIATE, priority: '0.8', changefreq: 'weekly' },
    { loc: ROUTES.SCHEMES, priority: '0.8', changefreq: 'weekly' },
    { loc: ROUTES.ABOUT, priority: '0.6', changefreq: 'monthly' },
    { loc: ROUTES.CONTACT, priority: '0.6', changefreq: 'monthly' },
    { loc: ROUTES.PRIVACY, priority: '0.3', changefreq: 'yearly' },
    { loc: ROUTES.TERMS, priority: '0.3', changefreq: 'yearly' },
  ];

  const appRoutes = publishedApps.map((app) => ({
    loc: ROUTES.APP_DETAIL(app.slug),
    priority: '0.9',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticRoutes, ...appRoutes];

  const urlsXml = allUrls
    .map(
      (item) => `  <url>
    <loc>${baseUrl}${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string = SITE_CONFIG.url): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}${ROUTES.SITEMAP}
`;
}

