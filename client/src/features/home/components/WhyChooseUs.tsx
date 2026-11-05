import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { WhyChooseUsItem } from '@shared/types/site';

export const WhyChooseUs: React.FC<{ items: WhyChooseUsItem[] }> = ({ items }) => {
  return (
    <Section variant="secondary" padding="lg">
      <Container>
        <div className="home-section-heading">
          <span className="home-section-kicker">
            The Yuvora Advantage
          </span>
          <h2>Why Top Shopify Brands Choose Us</h2>
          <p>
            We discard old bloated script paradigms in favor of cutting-edge edge infrastructure.
          </p>
        </div>

        <div className="advantage-grid">
          {items.map((item, index) => (
            <div key={index} className="advantage-card">
              <div className="advantage-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="advantage-title">{item.title}</h3>
              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
