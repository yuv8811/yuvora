export const ROUTES = {
  HOME: '/',
  APPS: '/apps',
  APP_DETAIL: (slug: string) => `/apps/${slug}`,
  APP_DETAIL_PARAM: '/apps/:slug',
  AFFILIATE: '/affiliate',
  SCHEMES: '/schemes',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SITEMAP: '/sitemap.xml',
  ROBOTS: '/robots.txt',
  API_APPS: '/api/apps',
  API_APP_BY_SLUG: (slug: string) => `/api/apps/${slug}`,
  API_AFFILIATE: '/api/affiliate',
  API_SCHEMES: '/api/schemes',
} as const;

