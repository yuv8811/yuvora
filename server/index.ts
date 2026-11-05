import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.routes';
import seoRoutes from './routes/seo.routes';
import { errorHandler } from './middleware/error.middleware';
import { env } from './config';
import { syncReviews } from './scripts/sync-reviews';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isProd = process.env.NODE_ENV === 'production';
const app = express();

app.use(compression());
app.use(cors());

// Strict trailing slash 301 redirect (e.g. /apps/ -> /apps)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1);
    return res.redirect(301, safePath + query);
  }
  next();
});

// Sitemap and Robots
app.use(seoRoutes);

// API Endpoints
app.use('/api', apiRoutes);

// SSR HTML Cache (in-memory)
const ssrCache = new Map<string, { html: string; status: number; timestamp: number }>();
const SSR_CACHE_TTL_MS = 60 * 1000; // 1 minute

async function createServer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let vite: any;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      root: rootDir,
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static assets from dist/client
    const clientDist = path.resolve(rootDir, 'dist/client');
    app.use(
      express.static(clientDist, {
        index: false,
        maxAge: '1y',
        immutable: true,
      })
    );
  }

  // Also serve public folder assets (images, favicon, etc.)
  app.use(express.static(path.resolve(rootDir, 'public'), { maxAge: '1d' }));

  // SSR Wildcard Handler
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    // Check SSR in-memory cache
    if (isProd) {
      const cached = ssrCache.get(url);
      if (cached && Date.now() - cached.timestamp < SSR_CACHE_TTL_MS) {
        res.setHeader('X-SSR-Cache', 'HIT');
        res.setHeader('Content-Type', 'text/html');
        return res.status(cached.status).send(cached.html);
      }
    }

    try {
      let template: string;
      let render: (url: string) => Promise<{
        appHtml: string;
        headTags: string;
        statusCode?: number;
      }>;

      if (!isProd) {
        // Read index.html on each request in dev
        const indexPath = path.resolve(rootDir, 'index.html');
        template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const module = await vite.ssrLoadModule('/client/src/app/entry-server.tsx');
        render = module.render;
      } else {
        const indexPath = path.resolve(rootDir, 'dist/client/index.html');
        template = fs.readFileSync(indexPath, 'utf-8');
        const entryServerPath = path.resolve(rootDir, 'dist/server/entry-server.js');
        const module = await import(entryServerPath);
        render = module.render;
      }

      const { appHtml, headTags, statusCode = 200 } = await render(url);

      const finalHtml = template
        .replace('<!--ssr-head-->', headTags || '')
        .replace('<!--ssr-outlet-->', appHtml);

      if (isProd && statusCode === 200) {
        ssrCache.set(url, { html: finalHtml, status: statusCode, timestamp: Date.now() });
      }

      res.setHeader('X-SSR-Cache', 'MISS');
      res.setHeader('Content-Type', 'text/html');
      res.status(statusCode).send(finalHtml);
    } catch (err) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(err);
      }
      next(err);
    }
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  createServer().then((server) => {
    const port = env.PORT || 3000;
    server.listen(port, () => {
      console.log(`🚀 Yuvora server running in ${isProd ? 'production' : 'development'} mode at http://localhost:${port}`);
      // Automatically fetch live reviews and rating counts from Shopify App Store
      syncReviews().catch((err) => {
        console.warn('⚠️ [Review Sync] Background check encountered error:', err instanceof Error ? err.message : err);
      });
    });
  });
}

export { createServer };
