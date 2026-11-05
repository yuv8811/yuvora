import { Request, Response, NextFunction } from 'express';
import { appsService } from '../services/apps.service';
import { ApiResponse } from '../../shared/types/api';
import { App } from '../../shared/schemas/app.schema';
import { AppError } from '../middleware/error.middleware';

export class AppsController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const category = typeof req.query.category === 'string' ? req.query.category : undefined;
      const apps = appsService.getAll(category);

      const response: ApiResponse<App[]> = {
        success: true,
        data: apps,
        meta: {
          total: apps.length,
          timestamp: new Date().toISOString(),
        },
      };

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  public static getBySlug(req: Request, res: Response, next: NextFunction): void {
    try {
      const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
      if (!slug) {
        throw new AppError('App slug is required.', 400, 'MISSING_SLUG');
      }
      const app = appsService.getBySlug(slug);

      if (!app) {
        throw new AppError(`App with slug '${slug}' was not found.`, 404, 'APP_NOT_FOUND');
      }

      const response: ApiResponse<App> = {
        success: true,
        data: app,
        meta: {
          timestamp: new Date().toISOString(),
        },
      };

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  public static getCategories(_req: Request, res: Response, next: NextFunction): void {
    try {
      const categories = appsService.getCategories();
      const response: ApiResponse<string[]> = {
        success: true,
        data: categories,
        meta: {
          total: categories.length,
          timestamp: new Date().toISOString(),
        },
      };
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}
