import { Request, Response, NextFunction } from 'express';
import { schemesService } from '../services/schemes.service';
import { ApiResponse } from '../../shared/types/api';
import { SchemesData } from '../../shared/schemas/scheme.schema';

export class SchemesController {
  public static getSchemes(_req: Request, res: Response, next: NextFunction): void {
    try {
      const data = schemesService.getSchemesData();
      const response: ApiResponse<SchemesData> = {
        success: true,
        data,
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

