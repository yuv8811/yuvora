import { z } from 'zod';

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  shopifyStore: z.string().optional(),
  topic: z.enum([
    'technical_support',
    'partnership',
    'feature_request',
    'billing',
    'general'
  ]).default('general'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;

