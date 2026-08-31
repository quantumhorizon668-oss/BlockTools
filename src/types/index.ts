export type ToolCategory = 'Coordinates' | 'Items' | 'Resources' | 'Time' | 'Building';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  input: string;
  result: string;
  explanation: string;
}

export interface ToolData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  iconName: string;
  isPopular?: boolean;
  isNew?: boolean;
  status: 'available' | 'planned';
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  howItWorks: {
    step: string;
    details: string;
  }[];
  importantNotes: string[];
  examples: ToolExample[];
  faqs: ToolFAQ[];
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
}

export interface GuideSection {
  heading: string;
  content: string;
  subsections?: {
    title: string;
    text: string;
  }[];
}

export interface GuideData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: ToolCategory;
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  relatedToolSlug: string;
  sections: GuideSection[];
  keyTakeaways: string[];
  faqs: ToolFAQ[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'tool' | 'guide' | 'page';
  category?: string;
  badge?: string;
}
