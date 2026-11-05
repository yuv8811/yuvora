import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { HomePage } from '@features/home/HomePage';
import { AppsPage } from '@features/apps/AppsPage';
import { AppDetailPage } from '@features/apps/AppDetailPage';
import { AffiliatePage } from '@features/affiliate/AffiliatePage';
import { SchemesPage } from '@features/schemes/SchemesPage';
import { AboutPage } from '@features/static/AboutPage';
import { ContactPage } from '@features/static/ContactPage';
import { PrivacyPage } from '@features/static/PrivacyPage';
import { TermsPage } from '@features/static/TermsPage';
import { NotFoundPage } from '@features/static/NotFoundPage';

/* Keep the client route tree identical to the SSR tree so hydration is stable. */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.APPS} element={<AppsPage />} />
      <Route path={ROUTES.APP_DETAIL_PARAM} element={<AppDetailPage />} />
      <Route path={ROUTES.AFFILIATE} element={<AffiliatePage />} />
      <Route path={ROUTES.SCHEMES} element={<SchemesPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
      <Route path={ROUTES.TERMS} element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
