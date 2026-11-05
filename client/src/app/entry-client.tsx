import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import '@styles/global.css';

const container = document.getElementById('root');

if (container) {
  const appElement = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // If container has SSR rendered HTML, hydrate it; otherwise createRoot
  if (container.hasChildNodes() && container.innerHTML.trim() !== '<!--ssr-outlet-->') {
    hydrateRoot(container, appElement);
  } else {
    createRoot(container).render(appElement);
  }
}
