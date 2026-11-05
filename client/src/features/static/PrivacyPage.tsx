import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Seo } from '@components/Seo/Seo';
import { SITE_CONFIG } from '@shared/constants/site';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy policy and data governance practices for Yuvora apps and services."
        canonical="/privacy"
      />

      <Section variant="default" padding="lg">
        <Container narrow>
          <h1>Privacy Policy</h1>
          <p style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
            Last updated: November 2026 • Effective immediately
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: 'var(--line-height-relaxed)' }}>
            <h2>1. Introduction &amp; Scope</h2>
            <p>
              {SITE_CONFIG.legalName} ("{SITE_CONFIG.name}", "we", "us", or "our") is dedicated to safeguarding merchant and consumer privacy. This Privacy Policy details our practices concerning data collected through our Shopify applications, partner portals, and website.
            </p>

            <h2>2. Shopify Mandatory Webhooks &amp; Data Minimization</h2>
            <p>
              In full compliance with Shopify App Store requirements, all Yuvora apps respond to mandatory Shopify customer and shop privacy webhooks:
            </p>
            <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li><strong>customers/data_request:</strong> Returns stored customer data upon verified request.</li>
              <li><strong>customers/redact:</strong> Permanently purges customer personal data upon redaction request.</li>
              <li><strong>shop/redact:</strong> Erases all merchant data within 48 hours of app uninstallation.</li>
            </ul>

            <h2>3. Information We Collect</h2>
            <p>
              We collect only the minimal data required to render app services: store domain name, access tokens provided through Shopify OAuth, order fulfillment statuses (for review collection triggers), and aggregated campaign performance metrics. We never sell or rent merchant or shopper data to third-party data brokers.
            </p>

            <h2>4. Security &amp; Edge Infrastructure</h2>
            <p>
              All communications are encrypted in transit via TLS 1.3. Where apps utilize Shopify Functions, execution occurs strictly inside Shopify's isolated edge runtime.
            </p>

            <h2>5. Contact Data Protection Officer</h2>
            <p>
              If you have any questions or data access requests under GDPR or CCPA, please contact our team at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} style={{ color: 'var(--color-accent)' }}>
                {SITE_CONFIG.supportEmail}
              </a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default PrivacyPage;
