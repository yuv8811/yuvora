import appsData from '../../../server/data/apps.json';
import affiliateData from '../../../server/data/affiliate.json';
import schemesData from '../../../server/data/schemes.json';
import siteData from '../../../server/data/site.json';
import { App, AppsListSchema } from '@shared/schemas/app.schema';
import { AffiliateProgram, AffiliateProgramSchema } from '@shared/schemas/affiliate.schema';
import { SchemesData, SchemesDataSchema } from '@shared/schemas/scheme.schema';
import { SiteData } from '@shared/types/site';

// Validate at client load as well for complete type safety
const validatedApps: App[] = AppsListSchema.parse(appsData);
const validatedAffiliate: AffiliateProgram = AffiliateProgramSchema.parse(affiliateData);
const validatedSchemes: SchemesData = SchemesDataSchema.parse(schemesData);
const validatedSite: SiteData = siteData as SiteData;

export const clientAppsService = {
  getAll: (category?: string): App[] => {
    const published = validatedApps.filter((a) => a.published === true);
    if (!category || category === 'All') return published;
    return published.filter((a) =>
      a.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
  },

  getBySlug: (slug: string): App | null => {
    return (
      validatedApps.find((a) => a.slug === slug && a.published === true) || null
    );
  },

  getFeatured: (): App[] => {
    return validatedApps.filter((a) => a.published === true && a.featured === true);
  },

  getCategories: (): string[] => {
    const set = new Set<string>();
    validatedApps
      .filter((a) => a.published === true)
      .forEach((a) => a.categories.forEach((c) => set.add(c)));
    return Array.from(set);
  },

  getRelated: (slug: string, limit = 2): App[] => {
    return validatedApps
      .filter((a) => a.published === true && a.slug !== slug)
      .slice(0, limit);
  },
};

export const clientAffiliateService = {
  getProgram: (): AffiliateProgram => validatedAffiliate,
};

export const clientSchemesService = {
  getSchemesData: (): SchemesData => validatedSchemes,
};

export const clientSiteService = {
  getSiteData: (): SiteData => validatedSite,
};
