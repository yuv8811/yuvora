import { describe, it, expect } from 'vitest';
import { appsService } from '../../server/services/apps.service';

describe('Apps Service', () => {
  it('returns only published apps by default', () => {
    const apps = appsService.getAll();
    expect(apps.length).toBeGreaterThan(0);
    apps.forEach((app) => {
      expect(app.published).toBe(true);
    });

    // Verify unpublished beta app is NOT included
    const betaApp = apps.find((a) => a.slug === 'draft-app');
    expect(betaApp).toBeUndefined();

    // Verify published apps are included
    const zenspeedApp = apps.find((a) => a.slug === 'zenspeed');
    expect(zenspeedApp).toBeDefined();
  });

  it('filters apps by category correctly', () => {
    const reviewApps = appsService.getAll('Product Reviews');
    expect(reviewApps.length).toBeGreaterThanOrEqual(1);
    expect(reviewApps.some((a) => a.slug === 'reviora')).toBe(true);

    const speedApps = appsService.getAll('Speed Optimization');
    expect(speedApps.length).toBeGreaterThanOrEqual(1);
    expect(speedApps.some((a) => a.slug === 'zenspeed')).toBe(true);
  });

  it('retrieves app by slug', () => {
    const app = appsService.getBySlug('zenspeed');
    expect(app).not.toBeNull();
    expect(app?.name).toBe('Zenspeed');
  });

  it('returns null for unpublished or non-existent app slug', () => {
    const nonexistent = appsService.getBySlug('non-existent-app');
    expect(nonexistent).toBeNull();

    const unpublished = appsService.getBySlug('draft-app');
    expect(unpublished).toBeNull();
  });

  it('retrieves distinct categories', () => {
    const categories = appsService.getCategories();
    expect(categories).toContain('Product Reviews');
  });
});

