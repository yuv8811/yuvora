const configuredBaseUrl = typeof process !== 'undefined' ? process.env.BASE_URL : undefined;

export const SITE_CONFIG = {
  name: 'Yuvora',
  legalName: 'Yuvora Technologies Inc.',
  tagline: 'High-Performance Shopify Apps Built for Scale',
  description: 'We build enterprise-grade Shopify apps that drive conversion, automate retention, and empower global e-commerce merchants to scale effortlessly.',
  url: configuredBaseUrl || 'https://yuvora.com',
  supportEmail: 'support@yuvora.com',
  affiliateEmail: 'affiliates@yuvora.com',
  partnersEmail: 'partners@yuvora.com',
  social: {
    twitter: 'https://twitter.com/yuvora_apps',
    github: 'https://github.com/yuvora',
    linkedin: 'https://linkedin.com/company/yuvora',
  },
  shopifyPartnerUrl: 'https://apps.shopify.com/partners/yuvora',
} as const;

