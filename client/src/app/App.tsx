import React from 'react';
import { MainLayout } from '@layouts/MainLayout';
import { AppRoutes } from './router';
import { AppProviders } from './providers';
import '@styles/global.css';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </AppProviders>
  );
};

export default App;
