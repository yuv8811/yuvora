import { z } from 'zod';

export const PricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  period: z.string(),
  description: z.string(),
  popular: z.boolean().default(false),
  features: z.array(z.string()),
  ctaText: z.string().default('Install Free Trial'),
  ctaUrl: z.string(),
});

export const AppFaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const AppFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const AppScreenshotSchema = z.object({
  url: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().default(1200),
  height: z.number().default(800),
});

export const AppReviewSchema = z.object({
  id: z.string().optional(),
  author: z.string(),
  rating: z.number().min(1).max(5),
  body: z.string(),
  date: z.string(),
  shopName: z.string().optional(),
  location: z.string().optional(),
});

export const AppSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  icon: z.string(),
  screenshots: z.array(AppScreenshotSchema),
  features: z.array(AppFeatureSchema),
  pricing: z.array(PricingPlanSchema),
  rating: z.number().min(0).max(5),
  ratingCount: z.number().int().nonnegative().default(100),
  installs: z.string(),
  categories: z.array(z.string()),
  shopifyAppStoreUrl: z.string().url(),
  faq: z.array(AppFaqItemSchema),
  reviews: z.array(AppReviewSchema).optional(),
  published: z.boolean(),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  enabled: z.boolean().default(true),
});

export const AppsListSchema = z.array(AppSchema);

export type App = z.infer<typeof AppSchema>;
export type AppReview = z.infer<typeof AppReviewSchema>;
export type PricingPlan = z.infer<typeof PricingPlanSchema>;
export type AppFeature = z.infer<typeof AppFeatureSchema>;
export type AppScreenshot = z.infer<typeof AppScreenshotSchema>;
export type AppFaqItem = z.infer<typeof AppFaqItemSchema>;

