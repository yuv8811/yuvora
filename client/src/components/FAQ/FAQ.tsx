import React from 'react';
import { Accordion, AccordionItemData } from '../Accordion/Accordion';
import { AppFaqItem } from '@shared/schemas/app.schema';
import { generateFaqJsonLd } from '@lib/seo';
import { cn } from '@lib/utils';

export interface FAQProps {
  items: AppFaqItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  includeSchema?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about setup, compatibility, and pricing.',
  className,
  includeSchema = false,
}) => {
  const accordionItems: AccordionItemData[] = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  const schema = includeSchema ? generateFaqJsonLd(items) : null;

  return (
    <div className={cn('faq-section', className)}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          {title && <h2>{title}</h2>}
          {subtitle && (
            <p style={{ marginTop: 'var(--space-2)', maxWidth: '640px', marginInline: 'auto' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <Accordion items={accordionItems} />
    </div>
  );
};
