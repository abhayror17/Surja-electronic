export enum Category {
  CONSUMER_ELECTRONICS = 'Consumer Electronics',
  CABLES_CONNECTORS = 'Cables & Connectors',
  POWER_SOLUTIONS = 'Power Solutions',
  COMPONENTS_PCB = 'Components & PCB'
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // Represents MOQ unit price or sample price
  category: Category;
  imageUrl: string;
  features: string[];
  specs: Record<string, string>;
}

export interface DemoProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  relatedProductIds: string[];
  date: string;
}

export type ViewState = 
  | { type: 'HOME' }
  | { type: 'CATALOG'; category?: Category }
  | { type: 'PRODUCT_DETAIL'; productId: string }
  | { type: 'DEMOS' };

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}