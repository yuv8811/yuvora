import { describe, it, expect } from 'vitest';
import { generateSitemapXml, generateRobotsTxt } from '../../server/utils/sitemap.generator';

describe('Sitemap & SEO Generator', () => {
  it('generates valid XML sitemap including all static pages and published apps', () => {
    const sitemap = generateSitemapXml('https://yuvora.com');

    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(sitemap).toContain('<loc>https://yuvora.com/</loc>');
    expect(sitemap).toContain('<loc>https://yuvora.com/apps</loc>');
    expect(sitemap).toContain('<loc>https://yuvora.com/apps/reviora</loc>');
    expect(sitemap).toContain('<loc>https://yuvora.com/apps/zenspeed</loc>');
    expect(sitemap).toContain('<loc>https://yuvora.com/affiliate</loc>');
    expect(sitemap).toContain('<loc>https://yuvora.com/schemes</loc>');

    // Should NOT contain unpublished app
    expect(sitemap).not.toContain('draft-app');
  });

  it('generates valid robots.txt referencing sitemap', () => {
    const robots = generateRobotsTxt('https://yuvora.com');
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://yuvora.com/sitemap.xml');
  });
});

