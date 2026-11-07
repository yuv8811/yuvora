import { Request, Response, NextFunction } from 'express';
import { affiliateService } from '../services/affiliate.service';
import { ApiResponse } from '../../shared/types/api';
import { AffiliateProgram, AffiliateApplicationSchema } from '../../shared/schemas/affiliate.schema';

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

  public static async submitApplication(req: Request, res: Response): Promise<void> {
    const parseResult = AffiliateApplicationSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const application = parseResult.data;
    const applicationId = `AFF-${Date.now().toString(36).toUpperCase()}`;

    console.log(`🤝 [Affiliate Application] New partner application from ${application.fullName} (${application.email}) for ${application.websiteUrl} [ID: ${applicationId}]`);

    res.status(200).json({
      success: true,
      message: 'Your partner application has been received! Our partner team will review your application and send your custom dashboard link within 24 hours.',
      applicationId,
    });
  }
}

