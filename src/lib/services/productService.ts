/**
 * DairyLift Product & Store Pricing Service
 * Multi-layer persistence: Cloud Firestore with synchronized local client cache
 */

import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, Product } from '../mockData/products';
import { db, isLiveFirebaseConfigured } from '../firebase/config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

export { type Product };

function loadInitialProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dairylift_products');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }
  return [...INITIAL_PRODUCTS];
}

let productsStore: Product[] = loadInitialProducts();

function saveProductsStore(list: Product[]) {
  productsStore = list;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('dairylift_products', JSON.stringify(list));
    } catch {
      // ignore
    }
  }
}

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
    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'products'));
        if (!snap.empty) {
          const remoteList = snap.docs.map((d) => d.data() as Product);
          saveProductsStore(remoteList);
        }
      } catch (err) {
        console.warn('Firestore products fetch error:', err);
      }
    }

    await new Promise((res) => setTimeout(res, 20));
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
   */
  async updatePricing(productId: string, newPrice: number, originalPrice?: number): Promise<Product> {
    await new Promise((res) => setTimeout(res, 30));
    const idx = productsStore.findIndex((p) => p.id === productId);
    if (idx === -1) throw new Error(`Product ${productId} not found`);
    if (newPrice <= 0) throw new Error('Price must be greater than zero');

    const updated = {
      ...productsStore[idx],
      price: newPrice,
      originalPrice: originalPrice !== undefined ? originalPrice : productsStore[idx].originalPrice,
    };

    const clone = [...productsStore];
    clone[idx] = updated;
    saveProductsStore(clone);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'products', productId), updated, { merge: true });
      } catch (err) {
        console.warn('Firestore updatePricing error:', err);
      }
    }

    return updated;
  },

  /**
   * Admin Control: Toggle stock availability
   */
  async toggleStock(productId: string, inStock: boolean): Promise<Product> {
    await new Promise((res) => setTimeout(res, 30));
    const idx = productsStore.findIndex((p) => p.id === productId);
    if (idx === -1) throw new Error(`Product ${productId} not found`);

    const updated = {
      ...productsStore[idx],
      inStock,
    };

    const clone = [...productsStore];
    clone[idx] = updated;
    saveProductsStore(clone);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'products', productId), updated, { merge: true });
      } catch (err) {
        console.warn('Firestore toggleStock error:', err);
      }
    }

    return updated;
  },
};
