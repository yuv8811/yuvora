import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-root">
      <a href="#main-content" className="sr-only" style={{ top: 8, left: 8, zIndex: 9999 }}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

