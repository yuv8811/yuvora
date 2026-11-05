import { Router } from 'express';
import { SitemapController } from '../controllers/sitemap.controller';

const router = Router();

router.get('/sitemap.xml', SitemapController.getSitemap);
router.get('/robots.txt', SitemapController.getRobots);

export default router;

