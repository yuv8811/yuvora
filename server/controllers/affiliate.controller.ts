import { Request, Response, NextFunction } from 'express';
import { affiliateService } from '../services/affiliate.service';
import { ApiResponse } from '../../shared/types/api';
import { AffiliateProgram } from '../../shared/schemas/affiliate.schema';

export class AffiliateController {
  public static getProgram(_req: Request, res: Response, next: NextFunction): void {
    try {
      const program = affiliateService.getProgram();
      const response: ApiResponse<AffiliateProgram> = {
        success: true,
        data: program,
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

