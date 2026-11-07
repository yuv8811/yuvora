import { describe, it, expect } from 'vitest';
import express from 'express';
import apiRoutes from '../../server/routes/api.routes';

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

// Helper for supertest-like in-memory testing using fetch/http
import http from 'http';

interface ResponsePayload {
  success?: boolean;
  message?: string;
  ticketId?: string;
  applicationId?: string;
  details?: Record<string, string[]>;
}

function doRequest(method: string, path: string, body?: Record<string, unknown>): Promise<{ status: number; data: ResponsePayload }> {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') return reject(new Error('Address error'));
      const port = addr.port;

      const payload = body ? JSON.stringify(body) : undefined;
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port,
          path,
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          },
        },
        (res) => {
          let chunks = '';
          res.on('data', (d) => (chunks += d));
          res.on('end', () => {
            server.close();
            try {
              const data = JSON.parse(chunks) as ResponsePayload;
              resolve({ status: res.statusCode || 200, data });
            } catch {
              resolve({ status: res.statusCode || 200, data: { message: chunks } });
            }
          });
        }
      );

      req.on('error', (e) => {
        server.close();
        reject(e);
      });

      if (payload) req.write(payload);
      req.end();
    });
  });
}

describe('Forms API - Contact & Affiliate', () => {
  it('submits contact form successfully with valid data', async () => {
    const res = await doRequest('POST', '/api/contact', {
      name: 'Sarah Connor',
      email: 'sarah@skynet.com',
      shopifyStore: 'resistance.myshopify.com',
      topic: 'technical_support',
      subject: 'Issue with Discount Tier setup',
      message: 'Hello, our volume discounts are not stacking properly on the checkout page.',
    });

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.ticketId).toBeDefined();
    expect(res.data.message).toContain('Thank you for reaching out');
  });

  it('rejects contact submission with invalid email or short message', async () => {
    const res = await doRequest('POST', '/api/contact', {
      name: 'A',
      email: 'not-an-email',
      subject: 'Hi',
      message: 'Too short',
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
    expect(res.data.details).toBeDefined();
    expect(res.data.details?.email).toBeDefined();
  });

  it('submits affiliate application successfully with valid data', async () => {
    const res = await doRequest('POST', '/api/affiliate/apply', {
      fullName: 'Marcus Vance',
      email: 'marcus@vancedesign.agency',
      websiteUrl: 'https://vancedesign.agency',
      partnerType: 'agency',
      referralVolume: '6-15',
      promotionStrategy: 'We launch 8 Shopify Plus redesigns per month.',
    });

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.applicationId).toBeDefined();
    expect(res.data.message).toContain('partner application has been received');
  });

  it('rejects affiliate application with missing required fields', async () => {
    const res = await doRequest('POST', '/api/affiliate/apply', {
      fullName: '',
      email: 'invalid-email',
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
    expect(res.data.details).toBeDefined();
  });
});
