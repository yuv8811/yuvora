import React, { useState } from 'react';
import { cn } from '@lib/utils';
import './Accordion.css';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenIndex !== undefined && items[defaultOpenIndex]) {
      return [items[defaultOpenIndex].id];
    }
    return [];
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn('accordion', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn('accordion-item', isOpen && 'is-open')}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="accordion-trigger"
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 5.5L7 9.5L11 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="accordion-content"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

