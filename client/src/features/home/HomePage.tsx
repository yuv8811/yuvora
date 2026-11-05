import React from 'react';
import { Hero } from './components/Hero';
import { FeaturedApps } from './components/FeaturedApps';
import { Stats } from './components/Stats';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FinalCta } from './components/FinalCta';
import { Seo } from '@components/Seo/Seo';
import { clientAppsService, clientSiteService } from '@lib/api';
import { generateOrganizationJsonLd } from '@lib/seo';
import { SITE_CONFIG } from '@shared/constants/site';

export const HomePage: React.FC = () => {
  const featuredApps = clientAppsService.getFeatured();
  const siteData = clientSiteService.getSiteData();
  const orgSchema = generateOrganizationJsonLd();

  return (
    <>
      <Seo
        title={`${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`}
        description={SITE_CONFIG.description}
        canonical="/"
        jsonLd={orgSchema}
        suffix={false}
      />
      <Hero />
      <FeaturedApps apps={featuredApps} />
      <Stats stats={siteData.stats} />
      <WhyChooseUs items={siteData.whyChooseUs} />
      <Testimonials testimonials={siteData.testimonials} />
      <FinalCta />
    </>
  );
};

export default HomePage;
