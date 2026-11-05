import React, { createContext, useContext, useRef } from 'react';

export interface HeadData {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  statusCode?: number;
}

export interface HeadContextValue {
  setHead: (data: HeadData) => void;
  getHead: () => HeadData;
}

export const HeadContext = createContext<HeadContextValue | null>(null);

export const HeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headRef = useRef<HeadData>({
    title: 'Yuvora - High-Performance Shopify Apps',
    description: 'Enterprise Shopify apps built on Shopify Functions for conversion, retention and scale.',
  });

  const setHead = (data: HeadData) => {
    headRef.current = data;
  };

  const getHead = () => headRef.current;

  return (
    <HeadContext.Provider value={{ setHead, getHead }}>
      {children}
    </HeadContext.Provider>
  );
};

export function useHead() {
  const ctx = useContext(HeadContext);
  if (!ctx) {
    throw new Error('useHead must be used within a HeadProvider');
  }
  return ctx;
}

