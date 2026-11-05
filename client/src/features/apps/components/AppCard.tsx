import React from 'react';
import { Link } from 'react-router-dom';
import { App } from '@shared/schemas/app.schema';
import { Button } from '@components/Button/Button';
import { ROUTES } from '@shared/constants/routes';
import { formatRating } from '@lib/formatters';
import './AppCard.css';

export interface AppCardProps {
  app: App;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <article className="app-card">
      <div className="app-card-header">
        <img
          src={app.icon}
          alt={`${app.name} app icon`}
          width={64}
          height={64}
          className="app-card-icon"
          loading="lazy"
          decoding="async"
        />
        <div className="app-card-title-group">
          <Link to={ROUTES.APP_DETAIL(app.slug)}>
            <h3 className="app-card-name">{app.name}</h3>
          </Link>
          <div className="app-card-meta">
            <span className="app-card-rating">
              <span className="app-card-star" aria-hidden="true">★</span>
              <span>{formatRating(app.rating)}</span>
              <span>({app.ratingCount})</span>
            </span>
            <span>•</span>
            <span>{app.installs} active stores</span>
            {app.badge && <span className="app-card-badge">{app.badge}</span>}
          </div>
        </div>
      </div>

      <p className="app-card-tagline">{app.tagline}</p>

      <div className="app-card-categories">
        {app.categories.map((cat: string, i: number) => (
          <span key={i} className="app-category-tag">
            {cat}
          </span>
        ))}
      </div>

      <div className="app-card-actions">
        <Button
          href={app.shopifyAppStoreUrl}
          variant="primary"
          size="sm"
          fullWidth
        >
          View on Shopify App Store
        </Button>
        <Button
          to={ROUTES.APP_DETAIL(app.slug)}
          variant="secondary"
          size="sm"
          fullWidth
        >
          Explore Features
        </Button>
      </div>
    </article>
  );
};
