import { z } from 'zod';

export const SchemeOfferSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  badge: z.string().optional(),
  eligibility: z.array(z.string()),
  benefits: z.array(z.string()),
  discountRate: z.string(),
  duration: z.string(),
  supportTier: z.string(),
  ctaText: z.string().default('Apply for Scheme'),
  ctaLink: z.string(),
  featured: z.boolean().default(false),
});

export const SchemeComparisonColumnSchema = z.object({
  schemeId: z.string(),
  name: z.string(),
  discount: z.string(),
  eligibilitySummary: z.string(),
  support: z.string(),
  coMarketing: z.string(),
  devStores: z.string(),
});

export const SchemesDataSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  schemes: z.array(SchemeOfferSchema),
  comparison: z.array(SchemeComparisonColumnSchema),
});

export type SchemeOffer = z.infer<typeof SchemeOfferSchema>;
export type SchemeComparisonColumn = z.infer<typeof SchemeComparisonColumnSchema>;
export type SchemesData = z.infer<typeof SchemesDataSchema>;

