import { Request, Response } from 'express';
import { ContactSubmissionSchema } from '../../shared/schemas/contact.schema';

export class ContactController {
  public static async submitContact(req: Request, res: Response): Promise<void> {
    const parseResult = ContactSubmissionSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const submission = parseResult.data;
    const ticketId = `YUV-${Date.now().toString(36).toUpperCase()}`;

    console.log(`📩 [Contact Form] New submission from ${submission.name} (${submission.email}): "${submission.subject}" [Ticket: ${ticketId}]`);

    res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Our team has received your message and will reply within 24 hours.',
      ticketId,
    });
  }
}

