'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/mockData/products';
import { useCartStore } from '@/lib/store/cartStore';
import { Star, Clock, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

const BADGE_STYLES: Record<string, string> = {
  gold: 'bg-gradient-to-r from-gold-400 to-gold-300 text-slate-850',
  green: 'bg-gradient-to-r from-forest-500 to-forest-400 text-white',
  amber: 'bg-amber-500 text-white',
  blue: 'bg-blue-500 text-white',
  purple: 'bg-purple-500 text-white',
  pink: 'bg-pink-500 text-white',
  red: 'bg-red-500 text-white',
  teal: 'bg-teal-500 text-white',
};

const CATEGORY_EMOJI: Record<string, string> = {
  milk: '🥛',
  ghee: '🫙',
  paneer: '🧀',
  butter: '🧈',
  yogurt: '🍦',
  cheese: '🫕',
  cream: '🍶',
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="premium-card overflow-hidden flex flex-col group"
    >
      {/* Product image area */}
      <div className="relative h-44 bg-gradient-to-br from-forest-50 via-cream-100 to-amber-50 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl"
        >
          {CATEGORY_EMOJI[product.category] || '🥛'}
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${BADGE_STYLES[product.badgeColor || 'green']}`}>
            {product.badge}
          </div>
        )}

        {/* Discount tag */}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        {/* Delivery time */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Zap className="w-3 h-3 text-forest-600" />
          <span className="text-xs font-semibold text-forest-700">{product.deliveryTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-slate-850 text-sm leading-tight flex-1">{product.name}</h3>
        </div>
        <p className="text-slate-850/50 text-xs mb-2">{product.unit} · {product.origin.split(',')[0]}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-gold-300 text-gold-300" />
            <span className="text-xs font-semibold text-slate-850">{product.rating}</span>
          </div>
          <span className="text-slate-850/30 text-xs">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.highlights.slice(0, 2).map((h) => (
            <span key={h} className="text-xs px-2 py-0.5 bg-forest-50 text-forest-700 rounded-full">{h}</span>
          ))}
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-display text-lg font-bold text-slate-850">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-slate-850/40 text-sm line-through ml-2">{formatCurrency(product.originalPrice)}</span>
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
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  isAdding
                    ? 'bg-forest-500 text-white scale-95'
                    : 'bg-forest-50 text-forest-700 hover:bg-forest-500 hover:text-white border border-forest-200 hover:border-forest-500'
                }`}
              >
                <Plus className="w-4 h-4" />
                {isAdding ? 'Added!' : 'Add'}
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-forest-500 rounded-xl px-2 py-1"
              >
                <button
                  onClick={() => updateQuantity(product.id, qty - 1)}
                  className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-white" />
                </button>
                <span className="text-white font-bold text-sm w-5 text-center">{qty}</span>
                <button
                  onClick={() => updateQuantity(product.id, qty + 1)}
                  className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
