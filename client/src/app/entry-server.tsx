import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { ServerAppRoutes } from './routes-server';
import { HeadContext, HeadData } from '@components/Seo/HeadContext';

export interface RenderResult {
  appHtml: string;
  headTags: string;
  statusCode: number;
}

export function render(url: string): RenderResult {
  let capturedHead: HeadData = {
    title: 'Yuvora - High-Performance Shopify Apps',
    description: 'Enterprise Shopify apps built on Shopify Functions for conversion, retention and scale.',
    statusCode: 200,
  };

  const setHead = (data: HeadData) => {
    capturedHead = data;
  };

  const getHead = () => capturedHead;

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HeadContext.Provider value={{ setHead, getHead }}>
        <StaticRouter location={url}>
          <MainLayout>
            <ServerAppRoutes />
          </MainLayout>
        </StaticRouter>
      </HeadContext.Provider>
    </React.StrictMode>
  );

  // Construct head tags
  const tags: string[] = [];

  if (capturedHead.title) {
    tags.push(`<title>${escapeHtml(capturedHead.title)}</title>`);
  }
  if (capturedHead.description) {
    tags.push(`<meta name="description" content="${escapeHtml(capturedHead.description)}" />`);
  }
  if (capturedHead.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(capturedHead.canonical)}" />`);
  }
  if (capturedHead.noindex) {
    tags.push('<meta name="robots" content="noindex, nofollow" />');
  }

  // Open Graph
  tags.push(`<meta property="og:title" content="${escapeHtml(capturedHead.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(capturedHead.description)}" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(capturedHead.ogType || 'website')}" />`);
  if (capturedHead.canonical) {
    tags.push(`<meta property="og:url" content="${escapeHtml(capturedHead.canonical)}" />`);
  }
  if (capturedHead.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(capturedHead.ogImage)}" />`);
  }

  // Twitter Card
  tags.push('<meta name="twitter:card" content="summary_large_image" />');
  tags.push(`<meta name="twitter:title" content="${escapeHtml(capturedHead.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(capturedHead.description)}" />`);
  if (capturedHead.ogImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(capturedHead.ogImage)}" />`);
  }

  // JSON-LD
  if (capturedHead.jsonLd) {
    const jsonLdContent = Array.isArray(capturedHead.jsonLd)
      ? capturedHead.jsonLd.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n')
      : `<script type="application/ld+json">${JSON.stringify(capturedHead.jsonLd)}</script>`;
    tags.push(jsonLdContent);
  }

  return {
    appHtml,
    headTags: tags.join('\n    '),
    statusCode: capturedHead.statusCode || 200,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
