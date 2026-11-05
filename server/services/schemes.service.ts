import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SchemesDataSchema, SchemesData } from '../../shared/schemas/scheme.schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/schemes.json');

class SchemesService {
  private data: SchemesData;

  constructor() {
    this.data = this.loadAndValidate();
  }

  public loadAndValidate(): SchemesData {
    const rawContent = fs.readFileSync(dataFilePath, 'utf-8');
    const parsedJson = JSON.parse(rawContent);
    const validationResult = SchemesDataSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error('Fatal: Invalid schemes.json data schema:', validationResult.error.format());
      throw new Error('Schemes data schema validation failed at server startup');
    }

    this.data = validationResult.data;
    return this.data;
  }

  public getSchemesData(): SchemesData {
    return this.data;
  }
}

export const schemesService = new SchemesService();

