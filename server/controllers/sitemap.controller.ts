import { Request, Response } from 'express';
import { generateSitemapXml, generateRobotsTxt } from '../utils/sitemap.generator';

export class SitemapController {
  public static getSitemap(req: Request, res: Response): void {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSitemapXml(baseUrl);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(sitemap);
  }

  public static getRobots(req: Request, res: Response): void {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const robots = generateRobotsTxt(baseUrl);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(robots);
  }
}

