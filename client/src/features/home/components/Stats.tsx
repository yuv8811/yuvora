import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { StatItem } from '@shared/types/site';

export const Stats: React.FC<{ stats: StatItem[] }> = ({ stats }) => {
  return (
    <Section variant="default" padding="lg">
      <Container>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">
                {stat.value}
              </span>
              <span className="stat-label">
                {stat.label}
              </span>
              <span className="stat-description">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
