import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { Button } from '@components/Button/Button';
import { ROUTES } from '@shared/constants/routes';
import { SITE_CONFIG } from '@shared/constants/site';
import './Header.css';

const applyTheme = (dark: boolean, persist = true) => {
  if (typeof window === 'undefined') return;

  document.documentElement.dataset.theme = dark ? 'dark' : 'light';

  if (persist) {
    try {
      localStorage.setItem('yuvora-theme', dark ? 'dark' : 'light');
    } catch {
      // Theme changes should still work when storage is unavailable.
    }
  }
};

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nextDark = (() => {
      try {
        return localStorage.getItem('yuvora-theme') === 'dark';
      } catch {
        return document.documentElement.dataset.theme === 'dark';
      }
    })();

    applyTheme(nextDark, false);
    setIsDark(nextDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = document.documentElement.dataset.theme !== 'dark';
    applyTheme(nextDark);
    setIsDark(nextDark);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="glass-header">
      <Container>
        <div className="header-nav">
          <Link to={ROUTES.HOME} className="header-logo" aria-label={`${SITE_CONFIG.name} Home`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="var(--color-logo-bg)" />
              <path
                d="M9 10L16 20L23 10"
                stroke="var(--color-logo-fg)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="23.5" r="2" fill="var(--color-logo-fg)" />
            </svg>
            <span>{SITE_CONFIG.name}</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <Link
              to={ROUTES.APPS}
              className={`nav-link ${location.pathname.startsWith('/apps') ? 'active' : ''}`}
            >
              Shopify Apps
            </Link>
            <Link
              to={ROUTES.SCHEMES}
              className={`nav-link ${location.pathname === ROUTES.SCHEMES ? 'active' : ''}`}
            >
              Schemes
            </Link>
            <Link
              to={ROUTES.AFFILIATE}
              className={`nav-link ${location.pathname === ROUTES.AFFILIATE ? 'active' : ''}`}
            >
              Affiliate Program
            </Link>
            <Link
              to={ROUTES.ABOUT}
              className={`nav-link ${location.pathname === ROUTES.ABOUT ? 'active' : ''}`}
            >
              About
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className={`nav-link ${location.pathname === ROUTES.CONTACT ? 'active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`theme-toggle-btn ${isDark ? 'is-dark' : ''}`}
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Button
              href={SITE_CONFIG.shopifyPartnerUrl}
              variant="primary"
              size="sm"
            >
              App Store Listing
            </Button>

            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="mobile-drawer-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="mobile-drawer-panel">
            <Link to={ROUTES.APPS} className="mobile-nav-link">
              Shopify Apps
            </Link>
            <Link to={ROUTES.SCHEMES} className="mobile-nav-link">
              Schemes &amp; Offers
            </Link>
            <Link to={ROUTES.AFFILIATE} className="mobile-nav-link">
              Affiliate Program
            </Link>
            <Link to={ROUTES.ABOUT} className="mobile-nav-link">
              About Yuvora
            </Link>
            <Link to={ROUTES.CONTACT} className="mobile-nav-link">
              Contact &amp; Support
            </Link>
            <div className="mobile-drawer-actions">
              <Button href={SITE_CONFIG.shopifyPartnerUrl} variant="primary" fullWidth>
                View on Shopify App Store
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
