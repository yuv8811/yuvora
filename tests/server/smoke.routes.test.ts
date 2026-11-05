import { describe, it, expect } from 'vitest';
import { render } from '../../client/src/app/entry-server';

describe('SSR Smoke Test - All Routes', () => {
  const routesToTest = [
    { path: '/', name: 'Home' },
    { path: '/apps', name: 'Apps Listing' },
    { path: '/apps/reviora', name: 'Reviora Detail' },
    { path: '/apps/zenspeed', name: 'Zenspeed Detail' },
    { path: '/affiliate', name: 'Affiliate Program' },
    { path: '/schemes', name: 'Schemes' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/privacy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' },
  ];

  routesToTest.forEach(({ path, name }) => {
    it(`renders route ${path} (${name}) with status 200 and exactly one <h1>`, () => {
      const { appHtml, headTags, statusCode } = render(path);

      expect(statusCode).toBe(200);

      // Verify that full HTML is returned
      expect(appHtml).toBeDefined();
      expect(appHtml.length).toBeGreaterThan(100);

      // Count <h1> tags in rendered HTML
      const h1Matches = appHtml.match(/<h1[^>]*>.*?<\/h1>/gis);
      expect(h1Matches).not.toBeNull();
      expect(h1Matches?.length).toBe(1);

      // Verify SEO head tags (title, description, canonical) are generated
      expect(headTags).toContain('<title>');
      expect(headTags).toContain('name="description"');
      expect(headTags).toContain('rel="canonical"');
    });
  });

  it('renders 404 page for non-existent route with status 404 and exactly one <h1>', () => {
    const { appHtml, headTags, statusCode } = render('/non-existent-random-route');
    expect(statusCode).toBe(404);

    const h1Matches = appHtml.match(/<h1[^>]*>.*?<\/h1>/gis);
    expect(h1Matches).not.toBeNull();
    expect(h1Matches?.length).toBe(1);
    expect(headTags).toContain('noindex');
  });
});

