import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { SchemeCard } from './components/SchemeCard';
import { SchemeComparisonTable } from './components/SchemeComparisonTable';
import { Button } from '@components/Button/Button';
import { Seo } from '@components/Seo/Seo';
import { clientSchemesService } from '@lib/api';
import { generateBreadcrumbJsonLd } from '@lib/seo';
import { SITE_CONFIG } from '@shared/constants/site';

export const SchemesPage: React.FC = () => {
  const schemesData = clientSchemesService.getSchemesData();

  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Schemes & Offers', item: '/schemes' },
  ]);

  return (
    <>
      <Seo
        title="Partner Schemes & Strategic Offers"
        description="Exclusive startup accelerators, Shopify agency dev store licenses, and annual billing discounts for fast-growing DTC merchants."
        canonical="/schemes"
        jsonLd={breadcrumbs}
      />

      <Section variant="default" padding="lg">
        <Container>
          <div style={{ maxWidth: '820px', marginBottom: 'var(--space-12)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Strategic Incentives
            </span>
            <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {schemesData.title}
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-text)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
              {schemesData.tagline}
            </p>
            <p style={{ fontSize: 'var(--font-size-body)' }}>
              {schemesData.description}
            </p>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid-cards">
            {schemesData.schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison Section */}
      <Section variant="secondary" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              At a Glance
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Compare Partner Schemes</h2>
            <p style={{ maxWidth: '640px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              Review eligibility criteria, discounts, co-marketing, and developer store access across all active programs.
            </p>
          </div>

          <SchemeComparisonTable columns={schemesData.comparison} />
        </Container>
      </Section>

      {/* Support & Custom Inquiries */}
      <Section variant="contrast" padding="lg">
        <Container narrow>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-text-inverse)', marginBottom: 'var(--space-4)' }}>
              Need a bespoke enterprise or multi-store plan?
            </h2>
            <p style={{ color: 'var(--color-text-inverse-muted)', fontSize: 'var(--font-size-body-lg)', marginBottom: 'var(--space-8)' }}>
              Our partnership team creates tailored solutions for Shopify Plus brands and multi-national agency rosters.
            </p>
            <Button
              href={`mailto:${SITE_CONFIG.partnersEmail}?subject=Custom%20Partner%20Scheme%20Inquiry`}
              variant="contrast"
              size="lg"
            >
              Contact Partnerships Team
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default SchemesPage;
