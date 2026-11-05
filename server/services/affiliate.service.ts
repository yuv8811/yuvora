import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AffiliateProgramSchema, AffiliateProgram } from '../../shared/schemas/affiliate.schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/affiliate.json');

class AffiliateService {
  private program: AffiliateProgram;

  constructor() {
    this.program = this.loadAndValidate();
  }

  public loadAndValidate(): AffiliateProgram {
    const rawContent = fs.readFileSync(dataFilePath, 'utf-8');
    const parsedJson = JSON.parse(rawContent);
    const validationResult = AffiliateProgramSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error('Fatal: Invalid affiliate.json data schema:', validationResult.error.format());
      throw new Error('Affiliate data schema validation failed at server startup');
    }

    this.program = validationResult.data;
    return this.program;
  }

  public getProgram(): AffiliateProgram {
    return this.program;
  }
}

export const affiliateService = new AffiliateService();

