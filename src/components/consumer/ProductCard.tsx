'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/mockData/products';
import { useCartStore } from '@/lib/store/cartStore';
import { Star, Clock, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

const BADGE_STYLES: Record<string, string> = {
  gold: 'bg-[var(--color-accent)] text-white font-bold',
  green: 'bg-[var(--color-brand)] text-white font-bold',
  amber: 'bg-amber-600 text-white font-bold',
  blue: 'bg-blue-600 text-white font-bold',
  purple: 'bg-purple-600 text-white font-bold',
  pink: 'bg-pink-600 text-white font-bold',
  red: 'bg-[var(--color-danger)] text-white font-bold',
  teal: 'bg-teal-600 text-white font-bold',
};

const getProductImage = (product: Product) => {
  if (product.image && !product.image.startsWith('/assets/')) {
    return product.image;
  }
  switch (product.category) {
    case 'milk':
      return '/images/product_a2_milk.jpg';
    case 'ghee':
      return '/images/product_ghee.jpg';
    case 'paneer':
      return '/images/product_paneer.jpg';
    case 'butter':
      return '/images/product_ghee.jpg';
    case 'cheese':
    case 'cream':
    case 'yogurt':
    default:
      return '/images/dairy_products_collection.jpg';
  }
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = async () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const imageUrl = getProductImage(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden flex flex-col group rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] shadow-xs hover:shadow-md transition-all"
    >
      {/* Product image area */}
      <div className="relative h-44 bg-[var(--color-surface-muted)] flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] uppercase tracking-wider ${BADGE_STYLES[product.badgeColor || 'green'] || 'bg-brand text-white'}`}>
            {product.badge}
          </div>
        )}

        {/* Discount tag */}
        {discount && (
          <div className="absolute top-2.5 right-2.5 bg-[var(--color-danger)] text-white text-[11px] font-bold px-2 py-0.5 rounded-[var(--radius-sm)]">
            -{discount}%
          </div>
        )}

        {/* Delivery time */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-[var(--radius-sm)] shadow-xs">
          <Zap className="w-3 h-3" style={{ color: 'var(--color-brand)' }} />
          <span className="text-[11px] font-semibold" style={{ color: 'var(--color-brand-dark)' }}>{product.deliveryTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight flex-1" style={{ color: 'var(--color-text-primary)' }}>
            {product.name}
          </h3>
        </div>
        <p className="text-xs mb-2.5" style={{ color: 'var(--color-text-tertiary)' }}>
          {product.unit} · {product.origin.split(',')[0]}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{product.rating}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.highlights.slice(0, 2).map((h) => (
            <span
              key={h}
              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--color-brand-muted)', color: 'var(--color-brand-dark)' }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--color-border)]">
          <div>
            <span className="text-base font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through ml-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] font-semibold text-xs transition-all cursor-pointer shadow-xs text-white"
                style={{
                  background: isAdding ? 'var(--color-brand-dark)' : 'var(--color-brand)',
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                {isAdding ? 'Added!' : 'Add'}
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 rounded-[var(--radius-md)] px-1.5 py-1 text-white shadow-xs"
                style={{ background: 'var(--color-brand)' }}
              >
                <button
                  onClick={() => updateQuantity(product.id, qty - 1)}
                  className="w-5 h-5 rounded-[var(--radius-sm)] bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <span className="text-white font-bold text-xs w-5 text-center">{qty}</span>
                <button
                  onClick={() => updateQuantity(product.id, qty + 1)}
                  className="w-5 h-5 rounded-[var(--radius-sm)] bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
