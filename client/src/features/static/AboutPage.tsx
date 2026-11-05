import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { Seo } from '@components/Seo/Seo';
import { ROUTES } from '@shared/constants/routes';
import { SITE_CONFIG } from '@shared/constants/site';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn how Yuvora is rebuilding Shopify app performance from the ground up using native Shopify Functions and modern web architecture."
        canonical="/about"
      />

      <Section variant="default" padding="lg">
        <Container narrow>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Our Mission
          </span>
          <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            We Build Shopify Apps That Never Slow You Down
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', fontSize: 'var(--font-size-body-lg)' }}>
            <p>
              E-commerce merchants have long suffered from "app bloat"—installing 15 different apps, each injecting multiple megabytes of legacy JavaScript, delaying checkout and degrading Google PageSpeed rankings.
            </p>
            <p>
              At <strong>{SITE_CONFIG.name}</strong>, we took a radical stand: build high-converting e-commerce tools exclusively on <strong>Shopify Functions</strong> and <strong>Theme App Extensions</strong>. All business logic executes natively at Shopify's global edge without script tags, external web requests, or database latency during checkout.
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                margin: 'var(--space-4) 0',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 style={{ marginBottom: 'var(--space-3)' }}>Our Core Engineering Principles</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-body)' }}>
                <li>⚡ <strong>Zero Latency:</strong> No external checkout blocking scripts. Native WebAssembly edge execution.</li>
                <li>🛡️ <strong>Zero Theme Pollution:</strong> 100% Online Store 2.0 theme app extensions. Install and remove cleanly with zero residual code.</li>
                <li>📈 <strong>Data-Driven Lift:</strong> Every feature must demonstrate verifiable conversion or average order value increase.</li>
                <li>🤝 <strong>Partner-Centric:</strong> Transparent revenue sharing, free staging stores, and real human support for agencies.</li>
              </ul>
            </div>

            <p>
              Today, our suite powers over 20,000 active Shopify merchants processing upwards of $140M annually across North America, Europe, and Asia-Pacific.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Button to={ROUTES.APPS} variant="primary">
                View Our Apps
              </Button>
              <Button to={ROUTES.CONTACT} variant="outline">
                Contact the Team
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
