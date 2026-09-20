/**
 * DairyLift Enterprise Product & E-Commerce Type Definitions
 */

export type ProductCategory =
  | 'A2_MILK'
  | 'VEDIC_BILONA_GHEE'
  | 'ARTISANAL_PANEER'
  | 'CULTURED_CURD_YOGURT'
  | 'PROBIOTIC_BUTTERMILK';

export interface ProductVariant {
  id: string;
  sku: string;
  sizeLabel: string;        // E.g., '1 Litre Glass Bottle', '500ml', '500g Jar'
  priceINR: number;
  mrpINR: number;
  stockQuantity: number;
  isSubscriptionEligible: boolean;
}

export interface NutritionalFact {
  per100gServing: string;
  energyKcal: number;
  proteinGrams: number;
  carbohydratesGrams: number;
  fatGrams: number;
  calciumMg: number;
  a2BetaCaseinCertified: boolean;
}

export interface DairyProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryDisplayName: string;
  tagline: string;
  description: string;
  originFarm: string;       // E.g., 'Nashik Agro-Park High-Tech Unit A'
  cattleSourceBreed: string;// E.g., 'Purebred Saurashtra Gir Cow'
  purityCertification: string; // E.g., 'Certified 100% A2 Beta-Casein • FSSAI Lic #10024021000842'
  storageInstructions: string;
  shelfLifeDays: number;
  imageUrl: string;
  emojiIcon: string;
  variants: ProductVariant[];
  nutritionalFacts: NutritionalFact;
  ingredients: string[];
  coldChainTemperatureThresholdCelsius: number; // < 4.0°C
  ratingAverage: number;
  reviewCount: number;
  isFeatured: boolean;
}
