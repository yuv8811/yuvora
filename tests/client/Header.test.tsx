import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '@layouts/Header';

afterEach(() => {
  cleanup();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('Header theme toggle', () => {
  it('applies and persists the selected theme', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('yuvora-theme')).toBe('dark');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('yuvora-theme')).toBe('light');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });
});
