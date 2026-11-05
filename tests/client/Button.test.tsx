import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '@components/Button/Button';

describe('Button Component', () => {
  it('renders button with text correctly', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('renders anchor when href is provided', () => {
    render(<Button href="https://apps.shopify.com">Shopify App Store</Button>);
    const link = screen.getByRole('link', { name: /shopify app store/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://apps.shopify.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders router link when to is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/apps">Browse Apps</Button>
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /browse apps/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/apps');
  });

  it('respects disabled attribute', () => {
    render(<Button disabled>Disabled Action</Button>);
    const btn = screen.getByRole('button', { name: /disabled action/i });
    expect(btn).toBeDisabled();
  });

  it('renders tertiary variant correctly', () => {
    render(<Button variant="tertiary">Partner Program</Button>);
    const btn = screen.getByRole('button', { name: /partner program/i });
    expect(btn).toHaveClass('btn', 'btn-tertiary');
  });
});

