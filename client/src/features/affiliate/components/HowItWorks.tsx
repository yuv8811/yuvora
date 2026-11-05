import React from 'react';
import { AffiliateStep } from '@shared/schemas/affiliate.schema';

export const HowItWorks: React.FC<{ steps: AffiliateStep[] }> = ({ steps }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--space-6)',
        margin: 'var(--space-8) 0',
      }}
    >
      {steps.map((s) => (
        <div
          key={s.step}
          style={{
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-8)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-on-accent)',
              fontWeight: 800,
              fontSize: 'var(--font-size-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {s.step}
          </div>
          <h3 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 700 }}>{s.title}</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
            {s.description}
          </p>
        </div>
      ))}
    </div>
  );
};
