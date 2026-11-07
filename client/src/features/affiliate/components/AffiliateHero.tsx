import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { AffiliateProgram } from '@shared/schemas/affiliate.schema';

export const AffiliateHero: React.FC<{ affiliate: AffiliateProgram }> = ({ affiliate }) => {
  return (
    <Section variant="default" padding="lg">
      <Container>
        <div style={{ textAlign: 'center', maxWidth: '840px', marginInline: 'auto' }}>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Partner Program
          </span>
          <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {affiliate.title}
          </h1>
          <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-text)', fontWeight: 500, marginBottom: 'var(--space-4)' }}>
            {affiliate.tagline}
          </p>
          <p style={{ fontSize: 'var(--font-size-body)', marginBottom: 'var(--space-8)' }}>
            {affiliate.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button href="#apply" variant="primary" size="lg">
              Apply to Become a Partner
            </Button>
            <Button href="#commission-structure" variant="outline" size="lg">
              View Commission Tiers
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

