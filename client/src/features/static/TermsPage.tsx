import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Seo } from '@components/Seo/Seo';
import { SITE_CONFIG } from '@shared/constants/site';

export const TermsPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms of service and merchant agreement for Yuvora applications and services."
        canonical="/terms"
      />

      <Section variant="default" padding="lg">
        <Container narrow>
          <h1>Terms of Service</h1>
          <p style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
            Last updated: November 2026 • Effective immediately
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: 'var(--line-height-relaxed)' }}>
            <h2>1. Agreement to Terms</h2>
            <p>
              By installing, accessing, or subscribing to any software application published by {SITE_CONFIG.legalName} through the Shopify App Store, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Shopify App Billing &amp; Free Trials</h2>
            <p>
              All recurring subscription fees and usage charges are processed directly via Shopify's official Billing API and billed in USD on your regular Shopify merchant invoice. Free trials automatically transition to the selected tier upon expiration unless canceled within your Shopify Admin prior to the trial end date.
            </p>

            <h2>3. Service Availability &amp; Edge Execution</h2>
            <p>
              While we architect our applications for 99.99% uptime utilizing native Shopify Functions and globally distributed CDNs, services are provided on an "as-is" and "as-available" basis without warranties of uninterrupted operation.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All intellectual property rights in the apps, documentation, website, and branding remain the exclusive property of {SITE_CONFIG.legalName}.
            </p>

            <h2>5. Termination &amp; Cancellation</h2>
            <p>
              You may cancel your subscription at any time by uninstalling the application from your Shopify Admin. Uninstallation terminates billing for subsequent billing cycles immediately.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TermsPage;
