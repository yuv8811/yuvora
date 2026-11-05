import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { Button } from '@components/Button/Button';
import { App } from '@shared/schemas/app.schema';
import { ROUTES } from '@shared/constants/routes';
import { formatRating } from '@lib/formatters';

export const AppDetailHero: React.FC<{ app: App }> = ({ app }) => {
  return (
    <div className="app-detail-hero">
      <Container>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link to={ROUTES.APPS} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)' }}>
            ← Back to All Apps
          </Link>
        </div>

        <div className="app-detail-hero-layout">
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            width={120}
            height={120}
            className="app-detail-icon-large"
            fetchPriority="high"
            decoding="async"
          />
          <div className="app-detail-meta-group">
            <div className="app-detail-title-row">
              <h1>{app.name}</h1>
              {app.badge && (
                <span
                  style={{
                    backgroundColor: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {app.badge}
                </span>
              )}
            </div>

            <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-text)', fontWeight: 500 }}>
              {app.tagline}
            </p>

            <div className="app-detail-metrics">
              <span className="app-detail-rating">
                <span style={{ color: 'var(--color-warning)' }} aria-hidden="true">★</span>
                <span>{formatRating(app.rating)}</span>
                <span>({app.ratingCount} reviews)</span>
              </span>
              <span>•</span>
              <span>{app.installs} active stores</span>
              <span>•</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                Shopify Functions Verified
              </span>
            </div>

            <div className="app-detail-ctas">
              <Button href={app.shopifyAppStoreUrl} variant="primary" size="lg">
                Install from Shopify App Store
              </Button>
              <Button href="#pricing" variant="outline" size="lg">
                View Pricing Plans
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

