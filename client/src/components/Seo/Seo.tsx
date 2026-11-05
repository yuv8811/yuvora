import React, { useEffect } from 'react';
import { useHead, HeadData } from './HeadContext';
import { SITE_CONFIG } from '@shared/constants/site';

interface SeoProps extends HeadData {
  suffix?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.svg',
  jsonLd,
  noindex = false,
  statusCode = 200,
  suffix = true,
}) => {
  const { setHead } = useHead();
  const fullTitle = suffix ? `${title} | ${SITE_CONFIG.name}` : title;
  const canonicalUrl = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;

  // Server-side registration
  setHead({
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    ogType,
    ogImage: fullOgImage,
    jsonLd,
    noindex,
    statusCode,
  });

  // Client-side DOM updates
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = fullTitle;

    const setMetaTag = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameOrProperty, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullOgImage);

    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    }

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    // Structured JSON-LD script tag
    const existingScript = document.getElementById('json-ld-structured');
    if (existingScript) {
      existingScript.remove();
    }
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld-structured';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, canonicalUrl, ogType, fullOgImage, jsonLd, noindex]);

  return null;
};
