import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { Seo } from '@components/Seo/Seo';
import { ContactForm } from '@features/contact/components/ContactForm';
import { SITE_CONFIG } from '@shared/constants/site';

export const ContactPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Contact & Support"
        description="Get in touch with the Yuvora engineering and partner success teams. 24-hour response time for merchant and partner inquiries."
        canonical="/contact"
      />

      <Section variant="default" padding="lg">
        <Container narrow>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Get In Touch
            </span>
            <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              We're Here to Help Your Store Scale
            </h1>
            <p style={{ fontSize: 'var(--font-size-body-lg)', maxWidth: '640px', margin: '0 auto' }}>
              Whether you need help with app setup, Core Web Vitals optimization, review migrations, or agency co-selling partnerships, reach out directly below.
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-12)' }}>
            <ContactForm />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--font-size-h3)' }}>Or Reach Us by Email</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
              Prefer direct email? Use our dedicated merchant support and partnership inboxes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Merchant Support Card */}
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 style={{ fontSize: 'var(--font-size-h4)' }}>Merchant Technical Support</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', flexGrow: 1 }}>
                Assistance with app setup, theme block positioning, discount logic, and bug reports. Average response time under 4 hours.
              </p>
              <Button href={`mailto:${SITE_CONFIG.supportEmail}?subject=Merchant%20Support%20Request`} variant="primary" fullWidth>
                Email Support ({SITE_CONFIG.supportEmail})
              </Button>
            </div>

            {/* Partnership Card */}
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 style={{ fontSize: 'var(--font-size-h4)' }}>Agency &amp; Affiliate Partnerships</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', flexGrow: 1 }}>
                Inquiries regarding dev store staging licenses, custom commission tiers, co-branded marketing, and agency partner schemes.
              </p>
              <Button href={`mailto:${SITE_CONFIG.partnersEmail}?subject=Partnership%20Inquiry`} variant="secondary" fullWidth>
                Email Partners ({SITE_CONFIG.partnersEmail})
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ContactPage;
