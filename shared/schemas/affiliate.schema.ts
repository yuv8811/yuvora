import { z } from 'zod';

export const AffiliateStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

export const CommissionTierSchema = z.object({
  tier: z.string(),
  activeReferrals: z.string(),
  commissionRate: z.string(),
  recurringPeriod: z.string(),
  perk: z.string(),
});

export const AffiliateBenefitSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const AffiliateFaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const AffiliateProgramSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  steps: z.array(AffiliateStepSchema),
  commissionTiers: z.array(CommissionTierSchema),
  benefits: z.array(AffiliateBenefitSchema),
  faq: z.array(AffiliateFaqSchema),
  cookieDays: z.number().default(60),
  minimumPayout: z.string().default('$50'),
  payoutFrequency: z.string().default('Monthly Net-15 via PayPal or Wire'),
  signupUrl: z.string(),
});

export const AffiliateApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  websiteUrl: z.string().min(3, 'Website or agency URL is required'),
  partnerType: z.enum([
    'agency',
    'consultant',
    'creator',
    'tech_partner',
    'other'
  ]).default('agency'),
  referralVolume: z.string().min(1, 'Please select your estimated monthly merchant volume'),
  promotionStrategy: z.string().optional(),
});

export type AffiliateProgram = z.infer<typeof AffiliateProgramSchema>;
export type AffiliateStep = z.infer<typeof AffiliateStepSchema>;
export type CommissionTier = z.infer<typeof CommissionTierSchema>;
export type AffiliateBenefit = z.infer<typeof AffiliateBenefitSchema>;
export type AffiliateFaq = z.infer<typeof AffiliateFaqSchema>;
export type AffiliateApplication = z.infer<typeof AffiliateApplicationSchema>;

