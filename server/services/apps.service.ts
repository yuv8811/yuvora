import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppsListSchema, App } from '../../shared/schemas/app.schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/apps.json');

class AppsService {
  private apps: App[] = [];

  constructor() {
    this.loadAndValidate();
  }

  public loadAndValidate(): void {
    const rawContent = fs.readFileSync(dataFilePath, 'utf-8');
    const parsedJson = JSON.parse(rawContent);
    const validationResult = AppsListSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error('Fatal: Invalid apps.json data schema:', validationResult.error.format());
      throw new Error('Apps data schema validation failed at server startup');
    }

    this.apps = validationResult.data;
  }

  /**
   * Retrieves all published apps, optionally filtered by category.
   */
  public getAll(category?: string): App[] {
    const publishedApps = this.apps.filter((app) => app.published === true);
    if (!category || category === 'All') {
      return publishedApps;
    }
    return publishedApps.filter((app) =>
      app.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
  }

  /**
   * Retrieves a single published app by slug.
   */
  public getBySlug(slug: string): App | null {
    const found = this.apps.find((app) => app.slug === slug && app.published === true);
    return found || null;
  }

  /**
   * Retrieves featured published apps for home page showcase.
   */
  public getFeatured(): App[] {
    return this.apps.filter((app) => app.published === true && app.featured === true);
  }

  /**
   * Retrieves unique categories across all published apps.
   */
  public getCategories(): string[] {
    const categoriesSet = new Set<string>();
    this.apps
      .filter((app) => app.published === true)
      .forEach((app) => app.categories.forEach((c) => categoriesSet.add(c)));
    return Array.from(categoriesSet);
  }

  /**
   * Returns related published apps excluding the specified app slug.
   */
  public getRelated(slug: string, limit = 2): App[] {
    return this.apps
      .filter((app) => app.published === true && app.slug !== slug)
      .slice(0, limit);
  }
}

export const appsService = new AppsService();

