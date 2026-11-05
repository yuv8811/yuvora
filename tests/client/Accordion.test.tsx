import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '@components/Accordion/Accordion';

describe('Accordion Component', () => {
  const sampleItems = [
    { id: '1', title: 'What is Shopify Functions?', content: 'Wasm based edge execution.' },
    { id: '2', title: 'Can I cancel anytime?', content: 'Yes, cancel via Shopify Admin.' },
  ];

  it('renders all accordion headers with proper accessibility attributes', () => {
    render(<Accordion items={sampleItems} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[0]).toHaveAttribute('aria-controls', 'accordion-panel-1');
  });

  it('toggles item open on click', () => {
    render(<Accordion items={sampleItems} />);
    const firstTrigger = screen.getByRole('button', { name: /what is shopify functions/i });

    expect(screen.queryByText(/wasm based edge execution/i)).not.toBeInTheDocument();

    fireEvent.click(firstTrigger);

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/wasm based edge execution/i)).toBeInTheDocument();

    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/wasm based edge execution/i)).not.toBeInTheDocument();
  });
});

