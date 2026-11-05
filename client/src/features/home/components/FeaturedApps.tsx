import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { AppCard } from '@features/apps/components/AppCard';
import { Button } from '@components/Button/Button';
import { App } from '@shared/schemas/app.schema';
import { ROUTES } from '@shared/constants/routes';

export interface FeaturedAppsProps {
  apps: App[];
}

export const FeaturedApps: React.FC<FeaturedAppsProps> = ({ apps }) => {
  return (
    <Section variant="secondary" padding="lg">
      <Container>
        <div className="home-section-heading">
          <span className="home-section-kicker">
            Engineered For Scale
          </span>
          <h2>Our Shopify Apps</h2>
          <p>
            Turn browsers into high-value repeat customers with our flagship apps, trusted by merchants and Plus agencies worldwide.
          </p>
        </div>

        <div className="grid-cards">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>

        <div className="home-section-action">
          <Button to={ROUTES.APPS} variant="outline" size="md">
            View All Apps &amp; Features →
          </Button>
        </div>
      </Container>
    </Section>
  );
};
