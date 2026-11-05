import React from 'react';
import { AffiliateBenefit } from '@shared/schemas/affiliate.schema';

export const AffiliateBenefits: React.FC<{ benefits: AffiliateBenefit[] }> = ({ benefits }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'var(--space-6)',
        margin: 'var(--space-8) 0',
      }}
    >
      {benefits.map((b, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <h3 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 700 }}>{b.title}</h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
            {b.description}
          </p>
        </div>
      ))}
    </div>
  );
};
