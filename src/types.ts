export type ScreenType = 
  | 'home' 
  | 'catalog' 
  | 'detail' 
  | 'lookbook' 
  | 'journal' 
  | 'cart' 
  | 'profile' 
  | 'importer';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Ceramics' | 'Lighting' | 'Seating' | 'Tables' | 'Vessels' | 'Textiles';
  price: number;
  designer: string;
  origin: string;
  material: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  secondaryImages: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  productId: string;
  label: string;
  price: number;
}

export interface SpaceTour {
  id: string;
  title: string;
  location: string;
  description: string;
  mainImage: string;
  hotspots: Hotspot[];
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  heroImage: string;
  content: string[];
  quote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ExtractedImage {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  detectedType: string;
}

export interface ParsedHtmlScreen {
  title: string;
  rawHtml: string;
  images: ExtractedImage[];
  headings: string[];
  links: string[];
  timestamp: number;
}
