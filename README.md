# Yuvora — Shopify Apps & Partner Ecosystem Platform

A production-ready company website and marketing platform showcasing published Shopify apps, affiliate programs, and strategic partner schemes. Engineered with an Apple/Samsung-inspired aesthetic, fluid typography, full Server-Side Rendering (SSR) for search crawlers, and a zero-database static JSON service architecture.

---

## 1. Architecture Overview

This platform uses a feature-based architecture with strict separation of concerns:

```
yuvora/
├── client/
│   └── src/
│       ├── app/          # App entry, router, providers, SSR entry
│       ├── components/   # Primitive reusable UI (Button, Card, Section, Container, Accordion, Modal, Seo, PricingTable, FAQ, FeatureGrid)
│       ├── features/     # Feature modules (home, apps, affiliate, schemes, static)
│       ├── layouts/      # MainLayout, Header, Footer
│       ├── hooks/        # useMediaQuery, useInView, useScrollReveal
│       ├── lib/          # API service layer, formatters, utilities, SEO helpers
│       └── styles/       # Design tokens (tokens.css), reset.css, global.css, utilities.css
├── server/
│   ├── index.ts          # Express SSR server with Vite dev middleware & production static handler
│   ├── config.ts         # Environment validation via Zod
│   ├── data/             # Static data store: apps.json, affiliate.json, schemes.json, site.json
│   ├── services/         # Business logic layer (filters published apps, validates schemas at startup)
│   ├── controllers/      # Express controllers (Apps, Affiliate, Schemes, Sitemap)
│   ├── routes/           # /api routes, /sitemap.xml, /robots.txt
│   └── middleware/       # Centralized error handler, in-memory cache, trailing slash 301 redirect
├── shared/               # Shared across client and server
│   ├── schemas/          # Zod validation schemas
│   ├── constants/        # Routes, site metadata
│   └── types/            # TypeScript interfaces
├── public/               # Static assets, SVG icons, screenshot mockups, avatars, favicon
└── tests/                # Unit, smoke, and end-to-end integration test suites
```

### Key Architectural Tenets
1. **Separation of Concerns:** UI components never fetch or shape data themselves. All access goes through `appsService.getAll()` or `clientAppsService.getAll()`. Swapping the static JSON backend for a database or headless CMS requires editing only the service layer without touching UI components.
2. **Data-Driven Scalability:** Pages render dynamically from validated data arrays. Adding a new app or scheme requires ONLY a data entry in `/server/data/*.json`, with zero JSX modifications needed.
3. **Fail-Fast Schema Validation:** All data is parsed with Zod schemas at server startup. Any malformed seed data causes the process to fail immediately with actionable validation errors.
4. **True Server-Side Rendering (SSR):** Every route ships pre-rendered HTML to crawlers containing semantic tags, exact single `<h1>` hierarchy, Open Graph/Twitter meta tags, and schema.org JSON-LD structured data.

---

## 2. Tech Stack

- **Frontend:** React 19 + Vite 8 + React Router 7 + TypeScript (Strict Mode).
- **Backend:** Node.js + Express 5 with Gzip/Brotli compression, CORS, ETag, and in-memory SSR caching.
- **Styling:** Plain CSS with CSS Custom Properties (Design Tokens) matching light and dark system color schemes (`prefers-color-scheme`). No heavy CSS frameworks.
- **Validation:** Zod 4 for runtime schema enforcement across client and server.
- **Testing:** Vitest 5 + React Testing Library + JSDOM for component tests, service unit tests, and route smoke tests.
- **Tooling:** ESLint 10 with typescript-eslint.

---

## 3. Getting Started

### Prerequisites
- Node.js >= 18.0.0 (Node 20+ recommended)
- npm >= 9.0.0

### Installation
```bash
npm install
```

### Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
Default configuration:
```env
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

### Development Mode
Runs the Express server with Vite middleware mode and automatic TypeScript compilation via TSX:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
Execute the full test suite (24 unit, component, and SSR smoke tests):
```bash
npm test
```

### Type Checking & Linting
```bash
npm run lint
npx tsc --noEmit
```

### Production Build & Serving
Builds both the client bundle (with route-level code splitting) and the server-side SSR bundle:
```bash
npm run build
npm start
```

---

## 4. How to Add a New App

Adding a new Shopify app requires **only** appending a new record to `/server/data/apps.json`. Zero code or route changes are required. The app will automatically appear in:
- The Apps Directory (`/apps`)
- Its own detail page (`/apps/:slug`)
- Related apps recommendations
- The dynamic `/sitemap.xml`
- Footer navigation

### Example Entry in `/server/data/apps.json`:
```json
{
  "slug": "cart-upsell-pro",
  "name": "Cart Upsell Pro",
  "tagline": "AI-powered product recommendations in your slide cart",
  "description": "Increase average order value with intelligent post-purchase and in-cart upsells powered by Shopify Functions.",
  "icon": "/images/apps/cart-upsell-icon.svg",
  "screenshots": [
    {
      "url": "/images/apps/cart-upsell-screen1.svg",
      "alt": "Cart Upsell Pro storefront slide cart preview",
      "caption": "Dynamic slide cart with one-click upsell addons",
      "width": 1200,
      "height": 800
    }
  ],
  "features": [
    {
      "title": "Shopify Functions Native",
      "description": "Executes on Shopify's global edge with sub-millisecond response.",
      "icon": "zap"
    }
  ],
  "pricing": [
    {
      "id": "starter",
      "name": "Starter",
      "price": "$19.99",
      "period": "month",
      "description": "Essential cart upsells for growing stores.",
      "popular": true,
      "features": ["Unlimited cart drawers", "14-day free trial"],
      "ctaText": "Start Free Trial",
      "ctaUrl": "https://apps.shopify.com/placeholder-cart-upsell"
    }
  ],
  "rating": 5.0,
  "ratingCount": 42,
  "installs": "1,500+",
  "categories": ["Cart & Checkout", "Conversion Optimization"],
  "shopifyAppStoreUrl": "https://apps.shopify.com/placeholder-cart-upsell",
  "faq": [
    {
      "question": "Does this work with headless storefronts?",
      "answer": "Yes, full Storefront API and Hydrogen support is included."
    }
  ],
  "published": true,
  "featured": true,
  "badge": "New Release"
}
```

> **Note:** If `"published": false`, the app will be hidden from public view, search crawlers, and the sitemap.

---

## 5. How to Add a New Scheme or Strategic Offer

Adding a new partnership program or incentive scheme requires **only** updating `/server/data/schemes.json`:

```json
{
  "id": "enterprise-plus-scheme",
  "name": "Shopify Plus Enterprise Scheme",
  "tagline": "White-glove migration, custom SLAs, and custom volume pricing",
  "description": "Tailored for high-volume merchants processing over $10M GMV annually.",
  "badge": "Enterprise",
  "eligibility": [
    "Active Shopify Plus merchant",
    "Annual GMV in excess of $5,000,000"
  ],
  "benefits": [
    "Dedicated Slack support channel with lead app architect",
    "Custom feature development and bespoke GraphQL queries"
  ],
  "discountRate": "Custom Volume Pricing",
  "duration": "Annual Agreement",
  "supportTier": "24/7 Dedicated Slack Channel",
  "ctaText": "Inquire for Enterprise",
  "ctaLink": "mailto:partners@yuvora.com?subject=Enterprise%20Plus%20Scheme",
  "featured": true
}
```

---

## 6. Performance & Lighthouse Optimizations

1. **Lightweight Footprint:** Plain CSS with design tokens (`client/src/styles/tokens.css`). Total minified CSS is under ~11KB (~2.9KB gzipped). Zero bloated UI component dependencies.
2. **Route-Level Code Splitting:** Client pages are loaded dynamically via `React.lazy()` and `Suspense`, keeping initial JavaScript bundles under the 100KB gzipped budget.
3. **Image Optimization:** Explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS). Above-the-fold hero images use `fetchpriority="high"`, while secondary images use `loading="lazy"` and `decoding="async"`.
4. **Caching Headers:** API endpoints and static assets are delivered with `ETag` and `Cache-Control: public, max-age=...` headers. The Express server maintains an in-memory cache for SSR rendered HTML.
5. **Accessibility (WCAG AA):** Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`), keyboard navigation traps for modals, ARIA attributes on accordions (`aria-expanded`, `aria-controls`), and minimum touch targets of 44x44px.

---

## 7. API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/apps` | GET | List all published Shopify apps (supports `?category=...`) |
| `/api/apps/categories` | GET | List all unique app categories |
| `/api/apps/:slug` | GET | Retrieve a single published app by slug (returns 404 if unpublished) |
| `/api/affiliate` | GET | Retrieve affiliate commission tiers, steps, and FAQs |
| `/api/schemes` | GET | Retrieve partner schemes and scheme comparison table |
| `/sitemap.xml` | GET | Dynamic XML sitemap for crawlers |
| `/robots.txt` | GET | Crawler directives pointing to `/sitemap.xml` |

---

## 8. Deployment

### Production Docker / Node Hosting
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   NODE_ENV=production npm start
   ```
The server will bind to `process.env.PORT` (defaults to 3000) and serve static assets directly from `dist/client` while rendering full SSR HTML via `dist/server/entry-server.js`.
# yuvora
