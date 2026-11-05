import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { AppCard } from './components/AppCard';
import { Seo } from '@components/Seo/Seo';
import { clientAppsService } from '@lib/api';
import { generateBreadcrumbJsonLd } from '@lib/seo';

export const AppsPage: React.FC = () => {
  const apps = clientAppsService
    .getAll()
    .filter((app) => app.slug !== 'discount-engine');

  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Shopify Apps', item: '/apps' },
  ]);

  return (
    <>
      <Seo
        title="Shopify Apps Directory"
        description="Browse Yuvora's top-rated Shopify apps for photo reviews, automated UGC collection, and conversion optimization."
        canonical="/apps"
        jsonLd={breadcrumbs}
      />
      <Section variant="default" padding="lg">
        <Container>
          <div style={{ maxWidth: '800px', marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              App Ecosystem
            </span>
            <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              Shopify Apps Built for Unstoppable Conversion
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-lg)' }}>
              Explore our native Shopify Functions apps. Built with zero script tags, sub-millisecond edge execution, and frictionless installation.
            </p>
          </div>

          <div
            className="grid-cards"
            style={{
              gridTemplateColumns:
                apps.length === 1
                  ? 'minmax(320px, 580px)'
                  : 'repeat(auto-fit, minmax(320px, 1fr))',
            }}
          >
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AppsPage;
