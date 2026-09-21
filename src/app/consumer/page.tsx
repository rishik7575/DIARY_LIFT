'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import CartDrawer from '@/components/consumer/CartDrawer';
import ProductCard from '@/components/consumer/ProductCard';
import { productService, Product } from '@/lib/services';
import { CATEGORIES } from '@/lib/mockData/products';
import { useCartStore } from '@/lib/store/cartStore';
import { Search, ShoppingCart, Zap, ShieldCheck, ChevronRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ConsumerPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const { openCart, totalItems, totalPrice } = useCartStore();

  useEffect(() => {
    async function loadCatalog() {
      const items = await productService.getProducts();
      setProducts(items);
    }
    loadCatalog();
  }, []);

  const cartCount = totalItems();
  const cartSubtotal = totalPrice();

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PortalGuard allowedRoles={['consumer', 'investor', 'admin']}>
      <PortalLayout allowedRoles={['consumer', 'investor', 'admin']}>
        <CartDrawer />

        {/* Co-ownership Promotional Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 mb-6 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-[11px] font-semibold">
                ⭐ Institutional Co-Ownership
              </Badge>
              <span className="text-[11px] text-slate-400">Illustrative Demo Model</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
              Love Farm-Fresh Dairy? Co-Own the Cattle that Produces It.
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Earn a fixed <strong>1.5% monthly base yield (18% APY)</strong> plus dynamic performance milk bonuses, backstopped by our 145% Yield Reserve fund.
            </p>
          </div>

          <Link href="/consumer/invest" className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-4"
            >
              Explore Co-Ownership <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Storefront Header & Filter Bar */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
                Fresh Farm Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                A2 Gir Cow Milk, Hand-Churned Bilona Ghee, and Cultured Dairy delivered in under 15 minutes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="primary"
                onClick={openCart}
                className="text-xs font-semibold flex items-center gap-2 relative shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({cartCount})</span>
                {cartCount > 0 && (
                  <span className="bg-amber-400 text-slate-900 text-[11px] font-bold px-1.5 py-0.2 rounded-full ml-1 font-mono">
                    ₹{cartSubtotal}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Category Filter Strip */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                type="text"
                placeholder="Search milk, bilona ghee, paneer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 border-slate-300 text-sm bg-white"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Value propositions banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center text-forest-700 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block">Sub-15 Minute EV Dispatch</strong>
                <span className="text-slate-500">Insulated cold crates at 3.5°C</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block">100% Pure Indigenous A2</strong>
                <span className="text-slate-500">Zero synthetic hormones or oxytocin</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block">RFID & Lab Certified</strong>
                <span className="text-slate-500">Traceable to individual cows</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              <p className="text-base font-semibold">No products found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting another category.</p>
            </div>
          )}

        </div>
      </PortalLayout>
    </PortalGuard>
  );
}
