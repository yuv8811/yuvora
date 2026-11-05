import React from 'react';
import { PricingPlan } from '@shared/schemas/app.schema';
import { Button } from '../Button/Button';
import { cn } from '@lib/utils';
import './PricingTable.css';

export interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  className,
}) => {
  return (
    <div className={cn('pricing-grid', className)}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn('pricing-card', plan.popular && 'is-popular')}
        >
          {plan.popular && <span className="pricing-badge">Most Popular</span>}
          <h3 className="pricing-name">{plan.name}</h3>
          <p className="pricing-desc">{plan.description}</p>

          <div className="pricing-price-wrap">
            <span className="pricing-price">{plan.price}</span>
            <span className="pricing-period">/ {plan.period}</span>
          </div>

          <ul className="pricing-features-list">
            {plan.features.map((feat: string, i: number) => (
              <li key={i} className="pricing-feature-item">
                <svg
                  className="pricing-check-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
                  <path
                    d="M6 10L9 13L14 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="pricing-cta-wrap">
            <Button
              href={plan.ctaUrl}
              variant={plan.popular ? 'primary' : 'outline'}
              fullWidth
            >
              {plan.ctaText}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
