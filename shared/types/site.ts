export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  store: string;
  metric: string;
  avatar?: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface SiteData {
  stats: StatItem[];
  testimonials: Testimonial[];
  whyChooseUs: WhyChooseUsItem[];
}

