/**
 * DairyLift Product & Store Pricing Service
 * Handles product discovery, search, stock validation, and admin pricing controls.
 */

import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, Product } from '../mockData/products';

export { type Product };

let productsStore: Product[] = [...INITIAL_PRODUCTS];

export const productService = {
  /**
   * Get list of categories
   */
  async getCategories() {
    await new Promise((res) => setTimeout(res, 20));
    return [...CATEGORIES];
  },

  /**
   * Get products with category and search filter
   */
  async getProducts(filter?: { category?: string; search?: string; inStockOnly?: boolean }): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 30));
    let items = [...productsStore];

    if (filter?.category && filter.category !== 'all') {
      items = items.filter((p) => p.category === filter.category);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filter?.inStockOnly) {
      items = items.filter((p) => p.inStock);
    }

    return items;
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    await new Promise((res) => setTimeout(res, 20));
    return productsStore.find((p) => p.id === id) || null;
  },

  /**
   * Admin Control: Update product retail pricing
   * Immediately propagates to consumer catalog and cart calculations.
   */
  async updatePricing(productId: string, newPrice: number, originalPrice?: number): Promise<Product> {
    await new Promise((res) => setTimeout(res, 40));
    const idx = productsStore.findIndex((p) => p.id === productId);
    if (idx === -1) throw new Error(`Product ${productId} not found`);

    if (newPrice <= 0) throw new Error('Price must be greater than zero');

    productsStore[idx] = {
      ...productsStore[idx],
      price: newPrice,
      originalPrice: originalPrice !== undefined ? originalPrice : productsStore[idx].originalPrice,
    };

    return productsStore[idx];
  },

  /**
   * Admin Control: Toggle stock availability
   */
  async toggleStock(productId: string, inStock: boolean): Promise<Product> {
    await new Promise((res) => setTimeout(res, 40));
    const idx = productsStore.findIndex((p) => p.id === productId);
    if (idx === -1) throw new Error(`Product ${productId} not found`);

    productsStore[idx] = {
      ...productsStore[idx],
      inStock,
    };

    return productsStore[idx];
  },
};
