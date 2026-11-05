import React from 'react';
import { Container } from '@components/Container/Container';
import { Button } from '@components/Button/Button';
import { ROUTES } from '@shared/constants/routes';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <Container>
        <div className="hero-pill">
          <span className="hero-pill-dot" aria-hidden="true" />
          <span className="hero-pill-badge">Shopify Functions Native</span>
          <span className="hero-pill-sep" aria-hidden="true">|</span>
          <span className="hero-pill-sub">Sub-Millisecond Checkout Speed</span>
        </div>

        <h1 className="hero-title">
          High-performance Shopify apps built for unstoppable conversion.
        </h1>

        <p className="hero-subline">
          Empowering 20,000+ global merchants with automated volume discounts, BOGO stacking, verified photo reviews, and zero checkout lag.
        </p>

        <div className="hero-ctas">
          <Button to={ROUTES.APPS} variant="primary" size="lg">
            Explore Shopify Apps
          </Button>
          <Button to={ROUTES.SCHEMES} variant="secondary" size="lg">
            View Partner Schemes
          </Button>
        </div>

        <div className="hero-media-wrapper">
          <div className="hero-media-window-bar">
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
            <span className="window-title">Discount Engine • Volume Pricing Campaign Builder</span>
          </div>
          <img
            src="/images/apps/discount-engine-screen1.svg"
            alt="Yuvora Shopify app interface dashboard showing volume tier configuration"
            width={1200}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="hero-image"
          />
        </div>
      </Container>
    </section>
  );
};
