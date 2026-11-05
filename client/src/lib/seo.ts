import { SITE_CONFIG } from '@shared/constants/site';
import { App } from '@shared/schemas/app.schema';

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.svg`,
    description: SITE_CONFIG.description,
    sameAs: [
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.shopifyPartnerUrl,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.supportEmail,
      contactType: 'customer support',
    },
  };
}

export function generateSoftwareAppJsonLd(app: App) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    operatingSystem: 'Shopify OS 2.0',
    applicationCategory: 'BusinessApplication',
    description: app.description,
    image: `${SITE_CONFIG.url}${app.icon}`,
    offers: app.pricing.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      url: app.shopifyAppStoreUrl,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: app.rating.toString(),
      ratingCount: app.ratingCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateFaqJsonLd(faq: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; item: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.url}${crumb.item}`,
    })),
  };
}
