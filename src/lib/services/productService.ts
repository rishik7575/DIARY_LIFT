/**
 * DairyLift Product Service
 * Handles product discovery, category filtering, search, and inventory checks
 */

import { PRODUCTS, CATEGORIES, Product } from '../mockData/products';

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
    await new Promise((res) => setTimeout(res, 40));
    let items = [...PRODUCTS];

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
    await new Promise((res) => setTimeout(res, 30));
    return PRODUCTS.find((p) => p.id === id) || null;
  },
};
