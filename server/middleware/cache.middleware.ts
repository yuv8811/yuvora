import { Request, Response, NextFunction } from 'express';

interface CacheEntry {
  body: unknown;
  timestamp: number;
}

const cacheStore = new Map<string, CacheEntry>();

export function memoryCache(durationSeconds = 60) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const now = Date.now();
    const cached = cacheStore.get(key);

    if (cached && now - cached.timestamp < durationSeconds * 1000) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${durationSeconds}`);
      return res.json(cached.body);
    }

    // Wrap res.json to capture response
    const originalJson = res.json.bind(res);
    res.json = (body: unknown) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(key, { body, timestamp: Date.now() });
      }
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('Cache-Control', `public, max-age=${durationSeconds}`);
      return originalJson(body);
    };

    next();
  };
}

export function clearMemoryCache() {
  cacheStore.clear();
}

