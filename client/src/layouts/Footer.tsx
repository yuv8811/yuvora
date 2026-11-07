import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/Container/Container';
import { ROUTES } from '@shared/constants/routes';
import { SITE_CONFIG } from '@shared/constants/site';
import { clientAppsService } from '@lib/api';
import './Footer.css';

export const Footer: React.FC = () => {
  const publishedApps = clientAppsService.getAll();

  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to={ROUTES.HOME} className="header-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
            <p>{SITE_CONFIG.description}</p>
          </div>

          <div>
            <h4 className="footer-heading">Shopify Apps</h4>
            <div className="footer-links">
              {publishedApps.map((app) => (
                <Link
                  key={app.slug}
                  to={ROUTES.APP_DETAIL(app.slug)}
                  className="footer-link"
                >
                  {app.name}
                </Link>
              ))}
              <Link to={ROUTES.APPS} className="footer-link">
                All Apps Directory →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Partnerships</h4>
            <div className="footer-links">
              <Link to={ROUTES.SCHEMES} className="footer-link">
                Partner Schemes &amp; Offers
              </Link>
              <Link to={ROUTES.AFFILIATE} className="footer-link">
                Affiliate Program
              </Link>
              <a href={SITE_CONFIG.shopifyPartnerUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                Shopify Partner Profile
              </a>
              <Link to={ROUTES.CONTACT} className="footer-link">
                Agency Co-Selling
              </Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Company</h4>
            <div className="footer-links">
              <Link to={ROUTES.ABOUT} className="footer-link">
                About Us
              </Link>
              <Link to={ROUTES.CONTACT} className="footer-link">
                Contact &amp; Support
              </Link>
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="footer-link">
                {SITE_CONFIG.supportEmail}
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">
                Twitter / X
              </a>
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved. Shopify is a trademark of Shopify Inc.</p>
          <div className="footer-legal-links">
            <Link to={ROUTES.PRIVACY} className="footer-link">
              Privacy Policy
            </Link>
            <Link to={ROUTES.TERMS} className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
