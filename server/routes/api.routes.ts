import { Router } from 'express';
import { AppsController } from '../controllers/apps.controller';
import { AffiliateController } from '../controllers/affiliate.controller';
import { SchemesController } from '../controllers/schemes.controller';
import { memoryCache } from '../middleware/cache.middleware';

const router = Router();

// Cache JSON responses for 60 seconds
router.use(memoryCache(60));

router.get('/apps', AppsController.getAll);
router.get('/apps/categories', AppsController.getCategories);
router.get('/apps/:slug', AppsController.getBySlug);
router.get('/affiliate', AffiliateController.getProgram);
router.get('/schemes', SchemesController.getSchemes);

export default router;

