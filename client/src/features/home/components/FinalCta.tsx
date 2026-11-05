import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Button } from '@components/Button/Button';
import { ROUTES } from '@shared/constants/routes';
import { SITE_CONFIG } from '@shared/constants/site';

export const FinalCta: React.FC = () => {
  return (
    <Section variant="contrast" padding="lg" className="final-cta-section">
      <Container narrow>
        <div className="final-cta">
          <span className="final-cta-kicker">
            Start Converting More Today
          </span>
          <h2>
            Ready to upgrade your Shopify store experience?
          </h2>
          <p>
            Join 20,000+ merchants. Install any app with a 14-day free trial. Zero theme edits required.
          </p>
          <div className="final-cta-actions">
            <Button href={SITE_CONFIG.shopifyPartnerUrl} variant="contrast" size="lg">
              Install from Shopify App Store
            </Button>
            <Button to={ROUTES.AFFILIATE} variant="tertiary" size="lg">
              Become an Affiliate Partner
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
