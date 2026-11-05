import React from 'react';
import { Container } from '@components/Container/Container';
import { Section } from '@components/Section/Section';
import { Testimonial } from '@shared/types/site';

export const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  return (
    <Section variant="default" padding="lg">
      <Container>
        <div className="home-section-heading">
          <span className="home-section-kicker">
            Verified Merchant Feedback
          </span>
          <h2>Loved by Store Owners &amp; Agencies</h2>
          <p>
            Real metrics from high-growth merchants scaling their Shopify stores with Yuvora apps.
          </p>
        </div>

        <div className="grid-cards">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div>
                <span className="testimonial-metric">
                  {t.metric}
                </span>
                <p className="testimonial-quote">
                  "{t.quote}"
                </p>
              </div>

              <div className="testimonial-author">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.author}
                    width={44}
                    height={44}
                    className="testimonial-avatar"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div>
                  <h4>{t.author}</h4>
                  <p>
                    {t.role} • {t.store}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
