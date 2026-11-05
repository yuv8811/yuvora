import React from 'react';
import { SchemeOffer } from '@shared/schemas/scheme.schema';
import { Button } from '@components/Button/Button';
import { cn } from '@lib/utils';
import './SchemeCard.css';

export interface SchemeCardProps {
  scheme: SchemeOffer;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  return (
    <article className={cn('scheme-card', scheme.featured && 'is-featured')}>
      {scheme.badge && <span className="scheme-badge">{scheme.badge}</span>}
      <h3 className="scheme-name">{scheme.name}</h3>
      <p className="scheme-tagline">{scheme.tagline}</p>
      <p className="scheme-desc">{scheme.description}</p>

      <div className="scheme-meta-box">
        <div>
          <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Incentive Rate</span>
          <strong style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>{scheme.discountRate}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Support Level</span>
          <strong style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>{scheme.supportTier}</strong>
        </div>
      </div>

      <div className="scheme-section-title">Eligibility Criteria</div>
      <ul className="scheme-list">
        {scheme.eligibility.map((item: string, i: number) => (
          <li key={i} className="scheme-list-item">
            <span className="scheme-check">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="scheme-section-title">Key Scheme Benefits</div>
      <ul className="scheme-list">
        {scheme.benefits.map((benefit: string, i: number) => (
          <li key={i} className="scheme-list-item">
            <span className="scheme-check">★</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="scheme-cta-wrapper">
        <Button
          href={scheme.ctaLink}
          variant={scheme.featured ? 'primary' : 'outline'}
          fullWidth
        >
          {scheme.ctaText}
        </Button>
      </div>
    </article>
  );
};
