import React from 'react';
import { HeadProvider } from '@components/Seo/HeadContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeadProvider>{children}</HeadProvider>;
};
