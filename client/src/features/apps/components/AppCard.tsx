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
  const isEnabled = app.enabled !== false;

  return (
    <article className={`app-card ${!isEnabled ? 'app-card-disabled' : ''}`}>
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
          {isEnabled ? (
            <Link to={ROUTES.APP_DETAIL(app.slug)}>
              <h3 className="app-card-name">{app.name}</h3>
            </Link>
          ) : (
            <h3 className="app-card-name" style={{ cursor: 'default' }}>
              {app.name}
            </h3>
          )}
          <div className="app-card-meta">
            <span className="app-card-rating">
              <span className="app-card-star" aria-hidden="true">★</span>
              <span>{formatRating(app.rating)}</span>
              <span>({app.ratingCount})</span>
            </span>
            <span>•</span>
            <span>{app.installs} active stores</span>
            {app.badge && <span className="app-card-badge">{app.badge}</span>}
            {!isEnabled && <span className="app-card-badge-disabled">Disabled</span>}
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
        {isEnabled ? (
          <>
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
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              disabled
              fullWidth
            >
              Coming Soon
            </Button>
            <Button
              to={ROUTES.APP_DETAIL(app.slug)}
              variant="outline"
              size="sm"
              fullWidth
            >
              Explore Features
            </Button>
          </>
        )}
      </div>
    </article>
  );
};
