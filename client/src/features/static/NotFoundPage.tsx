import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { Seo } from '@components/Seo/Seo';
import { ROUTES } from '@shared/constants/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Page Not Found (404)"
        description="The page you requested could not be found."
        noindex={true}
        statusCode={404}
      />

      <Section variant="default" padding="lg">
        <Container narrow>
          <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
            <span
              style={{
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 900,
                color: 'var(--color-accent)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              404
            </span>
            <h1 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              Page Not Found
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body-lg)',
                maxWidth: '500px',
                marginInline: 'auto',
                marginBottom: 'var(--space-8)',
              }}
            >
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Button to={ROUTES.HOME} variant="primary" size="lg">
                Back to Home
              </Button>
              <Button to={ROUTES.APPS} variant="outline" size="lg">
                Browse Shopify Apps
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NotFoundPage;
