import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { FeatureGrid } from '@components/FeatureGrid/FeatureGrid';
import { PricingTable } from '@components/PricingTable/PricingTable';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { AppDetailHero } from './components/AppDetailHero';
import { FAQ } from '@components/FAQ/FAQ';
import { AppCard } from './components/AppCard';
import { Seo } from '@components/Seo/Seo';
import { clientAppsService } from '@lib/api';
import { generateSoftwareAppJsonLd, generateBreadcrumbJsonLd } from '@lib/seo';
import { NotFoundPage } from '@features/static/NotFoundPage';
import './AppDetailPage.css';

export const AppDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? clientAppsService.getBySlug(slug) : null;

  if (!app) {
    return <NotFoundPage />;
  }

  const relatedApps = clientAppsService.getRelated(app.slug);
  const softwareSchema = generateSoftwareAppJsonLd(app);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Shopify Apps', item: '/apps' },
    { name: app.name, item: `/apps/${app.slug}` },
  ]);

  return (
    <>
      <Seo
        title={`${app.name} - ${app.tagline}`}
        description={app.description}
        canonical={`/apps/${app.slug}`}
        jsonLd={[softwareSchema, breadcrumbSchema]}
      />

      {/* Hero Header */}
      <AppDetailHero app={app} />

      {/* Features Grid */}
      <Section variant="default" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Core Capabilities
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Designed for Peak E-Commerce Performance</h2>
            <p style={{ maxWidth: '640px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              Built specifically for modern Shopify themes. Never compromises your site speed.
            </p>
          </div>

          <FeatureGrid features={app.features} columns={3} />
        </Container>
      </Section>

      {/* Screenshot Showcase */}
      {app.screenshots.length > 0 && (
        <Section variant="secondary" padding="lg">
          <Container>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Storefront &amp; Admin Interface
              </span>
              <h2 style={{ marginTop: 'var(--space-2)' }}>Interactive Experience</h2>
              <p style={{ maxWidth: '600px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
                Click any screenshot to zoom and explore live feature previews.
              </p>
            </div>

            <ScreenshotGallery screenshots={app.screenshots} />
          </Container>
        </Section>
      )}

      {/* Pricing Table */}
      <Section id="pricing" variant="default" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Simple &amp; Transparent Billing
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Flexible Plans for Every Stage</h2>
            <p style={{ maxWidth: '600px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              All plans include free trials, automatic Shopify billing integration, and cancel-anytime peace of mind.
            </p>
          </div>

          <PricingTable plans={app.pricing} />
        </Container>
      </Section>

      {/* FAQ */}
      {app.faq.length > 0 && (
        <Section variant="secondary" padding="lg">
          <Container narrow>
            <FAQ items={app.faq} includeSchema />
          </Container>
        </Section>
      )}

      {/* Final App CTA Banner */}
      <Section variant="contrast" padding="lg">
        <Container narrow>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-text-inverse)', marginBottom: 'var(--space-4)' }}>
              Install {app.name} Today
            </h2>
            <p style={{ color: 'var(--color-text-inverse-muted)', fontSize: 'var(--font-size-body-lg)', marginBottom: 'var(--space-8)' }}>
              Try it free on your store. Fully supported by our dedicated Shopify engineering team.
            </p>
            <Button href={app.shopifyAppStoreUrl} variant="contrast" size="lg">
              View on Shopify App Store
            </Button>
          </div>
        </Container>
      </Section>

      {/* Related Apps */}
      {relatedApps.length > 0 && (
        <Section variant="default" padding="lg">
          <Container>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2>More Shopify Apps by Yuvora</h2>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Explore complementary apps from our high-performance suite.
              </p>
            </div>
            <div className="grid-cards">
              {relatedApps.map((rel) => (
                <AppCard key={rel.slug} app={rel} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default AppDetailPage;
