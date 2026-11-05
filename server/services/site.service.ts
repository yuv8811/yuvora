import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SiteData } from '../../shared/types/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/site.json');

class SiteService {
  private data: SiteData;

  constructor() {
    const rawContent = fs.readFileSync(dataFilePath, 'utf-8');
    this.data = JSON.parse(rawContent) as SiteData;
  }

  public getSiteData(): SiteData {
    return this.data;
  }
}

export const siteService = new SiteService();

