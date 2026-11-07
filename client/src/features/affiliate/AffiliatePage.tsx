import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { AffiliateHero } from './components/AffiliateHero';
import { HowItWorks } from './components/HowItWorks';
import { CommissionTable } from './components/CommissionTable';
import { AffiliateBenefits } from './components/AffiliateBenefits';
import { AffiliateForm } from './components/AffiliateForm';
import { FAQ } from '@components/FAQ/FAQ';
import { Seo } from '@components/Seo/Seo';
import { clientAffiliateService } from '@lib/api';
import { generateBreadcrumbJsonLd } from '@lib/seo';

export const AffiliatePage: React.FC = () => {
  const affiliate = clientAffiliateService.getProgram();

  const breadcrumbs = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Affiliate Program', item: '/affiliate' },
  ]);

  return (
    <>
      <Seo
        title="Shopify Apps Affiliate & Partner Program"
        description="Earn up to 30% lifetime recurring commissions recommending Yuvora's top-rated Shopify apps to DTC merchants and clients."
        canonical="/affiliate"
        jsonLd={breadcrumbs}
      />

      {/* Hero */}
      <AffiliateHero affiliate={affiliate} />

      {/* How it works */}
      <Section variant="secondary" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step-by-Step
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>How the Programme Works</h2>
            <p style={{ maxWidth: '600px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              Four simple steps from referral to steady monthly recurring payouts.
            </p>
          </div>

          <HowItWorks steps={affiliate.steps} />
        </Container>
      </Section>

      {/* Commission Structure */}
      <Section id="commission-structure" variant="default" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Lifetime Recurring Revenue
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Commission Structure &amp; Tiers</h2>
            <p style={{ maxWidth: '640px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              We reward our closest partners with escalating recurring tiers, free staging store licenses, and priority co-selling support.
            </p>
          </div>

          <CommissionTable tiers={affiliate.commissionTiers} />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-8)',
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <div>
              <strong>Cookie Duration:</strong> {affiliate.cookieDays} Days
            </div>
            <div>
              <strong>Minimum Payout:</strong> {affiliate.minimumPayout}
            </div>
            <div>
              <strong>Payout Frequency:</strong> {affiliate.payoutFrequency}
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section variant="secondary" padding="lg">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Partner Advantages
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Why Partner With Yuvora</h2>
            <p style={{ maxWidth: '600px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              Everything you need to successfully introduce high-converting tools to your clients.
            </p>
          </div>

          <AffiliateBenefits benefits={affiliate.benefits} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="default" padding="lg">
        <Container narrow>
          <FAQ items={affiliate.faq} includeSchema />
        </Container>
      </Section>

      {/* Partner Application Form */}
      <Section id="apply" variant="secondary" padding="lg">
        <Container narrow>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Partner Onboarding
            </span>
            <h2 style={{ marginTop: 'var(--space-2)' }}>Apply to the Partner Programme</h2>
            <p style={{ maxWidth: '600px', marginInline: 'auto', marginTop: 'var(--space-2)' }}>
              Complete the quick application below. Our partner success team will review and approve your custom referral dashboard within 24 hours.
            </p>
          </div>

          <AffiliateForm />
        </Container>
      </Section>
    </>
  );
};

export default AffiliatePage;
