export interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  borderColor?: 'red' | 'blue' | 'green' | 'gold' | 'white';
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface PublicationBlock {
  type: 'text' | 'image' | 'button';
  content: string;
  extra?: string;
  buttonColor?: string;
  icon?: string;
}

export interface Publication {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email';
  question: string;
  options?: string[];
}

export interface SurveyResponse {
  date: string;
  answers: Record<string, string>;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  ctaLabel?: string;
  ctaLink?: string;
}

export interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  borderColor?: string; // Changed to string to allow hex or preset names
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface PublicationBlock {
  type: 'text' | 'image' | 'button';
  content: string;
  extra?: string;
  buttonColor?: string;
  icon?: string;
}

export interface Publication {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email';
  question: string;
  options?: string[];
}

export interface SurveyResponse {
  date: string;
  answers: Record<string, string>;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  ctaLabel?: string;
  ctaLink?: string;
}

export type Language = 'en' | 'es';

export interface LegalSection {
  heading: string;
  content: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProtocolStep {
  phase: string;
  title: string;
  details: string[];
  type: 'blue' | 'red' | 'neutral' | 'gold';
  icon?: string;
}

export interface Pillar {
  title: string;
  icon: string;
  desc: string[];
}

export interface Content {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
  };
  intro: {
    title: string;
    description: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
  };
  comparison: {
    title: string;
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  services: {
    blue: {
      name: string;
      subtitle: string;
      features: string[];
      priceRange: string;
      priceNote: string;
      cta: string;
    };
    red: {
      name: string;
      subtitle: string;
      features: string[];
      priceRange: string;
      priceNote: string;
      cta: string;
    };
    hook: string;
  };
  protocols: {
    title: string;
    description: string;
    pillarsTitle: string;
    pillars: Pillar[];
    steps: ProtocolStep[];
    closure: string;
  };
  whoWeAre: {
    title: string;
    rouletteTitle: string;
    sectors: string[];
    specialSector: string;
    specialMessage: string;
    report: Array<{
      title: string;
      content: string;
    }>;
    pillars: Pillar[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    location: string;
    locationLabel: string;
  };
  process: {
    title: string;
    bluePhase: {
      title: string;
      steps: Array<{ id: string; title: string; desc: string }>;
    };
    redPhase: {
      title: string;
      steps: Array<{ id: string; title: string; desc: string }>;
    };
    barrierLabel: string;
  };
  appExperience: {
    text: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
  };
  costExperience: {
    title: string;
    subtitle: string;
    labels: {
      traditional: string;
      traditionalDesc: string;
      authomia: string;
      authomiaDesc: string;
    };
    floatingPoints: Array<string>;
    insights: Array<{
      id: number;
      label: string;
      text: string;
    }>;
  };
  testimonials: {
    title: string;
    voidTitle: string;
    voidDesc: string;
    cta: string;
  };
  clients: {
    title: string;
    subtitle: string;
    slotTitle: string;
    slotDesc: string;
    cta: string;
  };
  finalCta: {
    title: string;
    blueSummary: string;
    redSummary: string;
  };
  footer: {
    legal: string[]; 
    social: string[];
    nav: string[];
    contact: string;
    copyright: string;
  };
  legalDocuments: {
    privacy: LegalDocument;
    terms: LegalDocument;
    legalNotice: LegalDocument;
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
}

export interface AIState {
  isOpen: boolean;
  messages: Array<{
    role: 'user' | 'model';
    text: string;
  }>;
  isLoading: boolean;
}