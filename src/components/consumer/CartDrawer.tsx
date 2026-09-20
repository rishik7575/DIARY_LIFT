'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { X, Minus, Plus, ShoppingBag, Trash2, Zap, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { orderService, CheckoutInput } from '@/lib/services';
import { DeliverySlotTime, OrderFulfillment } from '@/lib/types/order';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderFulfillment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery details form state
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlotTime>('EARLY_MORNING_06_08_AM');
  const [addressForm, setAddressForm] = useState({
    fullName: 'Aarav Gupta',
    phone: '+91 98201 99481',
    flatHouseNo: 'Flat 1402, Tower B',
    societyBuilding: 'Kalpataru Horizon',
    streetArea: 'Worli South',
    city: 'Mumbai',
    pincode: '400018',
  });

  const cartItems = items.map((i) => ({ price: i.product.price, quantity: i.quantity }));
  const pricing = orderService.calculateCartSummary(cartItems);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setStep('checkout');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const checkoutData: CheckoutInput = {
        userId: 'usr-consumer-01',
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          variantId: 'v1',
          sizeLabel: item.product.unit,
          unitPriceINR: item.product.price,
          quantity: item.quantity,
          totalLinePriceINR: item.product.price * item.quantity,
          emojiIcon: '🥛',
        })),
        address: addressForm,
        slot: deliverySlot,
      };

      const created = await orderService.createOrder(checkoutData);
      setConfirmedOrder(created);
      clearCart();
      setStep('confirmed');
    } catch (err: any) {
      alert(err.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('cart');
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-forest-50 border border-forest-100 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {step === 'cart' ? 'Your Fresh Dairy Basket' : step === 'checkout' ? 'Fulfillment & Delivery' : 'Order Confirmed'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {step === 'confirmed' ? 'Dispatched from DairyLift Parlour' : `${items.length} items selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: CART ITEMS */}
            {step === 'cart' && (
              <>
                {/* Free delivery banner */}
                <div className="px-5 py-2.5 bg-forest-50 border-b border-forest-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-forest-700 shrink-0" />
                    <span className="text-forest-800 font-medium">
                      {pricing.isFreeDelivery
                        ? '🎉 Free Farm Delivery unlocked!'
                        : `Add ${formatCurrency(pricing.amountNeededForFreeDelivery)} more for Free Delivery`}
                    </span>
                  </div>
                  <span className="font-mono text-forest-700 font-bold">Min ₹499</span>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-3">
                        🥛
                      </div>
                      <h3 className="font-bold text-slate-850">Your basket is empty</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                        Add farm-fresh A2 milk, bilona ghee, or artisan paneer to begin.
                      </p>
                    </div>
                  ) : (
                    items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs text-slate-900 truncate">{product.name}</h4>
                          <p className="text-[11px] text-slate-500">{product.unit} • {formatCurrency(product.price)} each</p>
                          <p className="font-bold text-xs text-forest-700 mt-1">
                            {formatCurrency(product.price * quantity)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="text-slate-500 hover:text-slate-900 p-0.5"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-4 text-center font-mono">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="text-slate-500 hover:text-slate-900 p-0.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Pricing Summary */}
                {items.length > 0 && (
                  <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-mono">{formatCurrency(pricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EV Fleet Delivery Fee</span>
                        <span className="font-mono">
                          {pricing.deliveryFee === 0 ? (
                            <strong className="text-forest-700">FREE</strong>
                          ) : (
                            formatCurrency(pricing.deliveryFee)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Artisan GST (5%)</span>
                        <span className="font-mono">{formatCurrency(pricing.gst)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                        <span>Grand Total</span>
                        <span className="font-mono text-forest-700">{formatCurrency(pricing.grandTotal)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceedToCheckout}
                      variant="forest"
                      className="w-full bg-forest-700 hover:bg-forest-800 text-white font-medium py-3 flex items-center justify-center gap-2"
                    >
                      Proceed to Fulfillment <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT & ADDRESS */}
            {step === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  
                  {/* Delivery Slot Selection */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-forest-700" />
                      Select Delivery Slot
                    </Label>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        { id: 'EARLY_MORNING_06_08_AM' as DeliverySlotTime, label: '🌅 Early Morning (6:00 AM - 8:00 AM)', tag: 'Recommended' },
                        { id: 'MORNING_08_10_AM' as DeliverySlotTime, label: '☀️ Morning (8:00 AM - 10:00 AM)' },
                        { id: 'EVENING_05_07_PM' as DeliverySlotTime, label: '🌆 Evening (5:00 PM - 7:00 PM)' },
                      ].map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setDeliverySlot(slot.id)}
                          className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between ${
                            deliverySlot === slot.id
                              ? 'border-forest-600 bg-forest-50/50 text-forest-900 font-medium'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          <span>{slot.label}</span>
                          {slot.tag && (
                            <span className="text-[10px] bg-forest-700 text-white px-2 py-0.5 rounded font-bold">
                              {slot.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address Form */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-forest-700" />
                      Delivery Location & Contact
                    </Label>

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Recipient Name"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        required
                        className="text-xs h-9"
                      />
                      <Input
                        placeholder="Mobile Number"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                        className="text-xs h-9"
                      />
                    </div>

                    <Input
                      placeholder="Flat / Floor / House No."
                      value={addressForm.flatHouseNo}
                      onChange={(e) => setAddressForm({ ...addressForm, flatHouseNo: e.target.value })}
                      required
                      className="text-xs h-9"
                    />

                    <Input
                      placeholder="Apartment / Society Name"
                      value={addressForm.societyBuilding}
                      onChange={(e) => setAddressForm({ ...addressForm, societyBuilding: e.target.value })}
                      required
                      className="text-xs h-9"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                        className="text-xs h-9"
                      />
                      <Input
                        placeholder="Pincode"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        required
                        className="text-xs h-9"
                      />
                    </div>
                  </div>

                  {/* Cold chain assurance */}
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Packed in insulated chilled glass crates at 3.5°C with tamper-evident seal.</span>
                  </div>

                </div>

                {/* Checkout Footer */}
                <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">Total Payable (Incl. Taxes)</span>
                    <span className="text-base font-bold font-mono text-forest-700">
                      {formatCurrency(pricing.grandTotal)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setStep('cart')}
                      className="border-slate-300"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="forest"
                      disabled={isSubmitting}
                      className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-medium"
                    >
                      {isSubmitting ? 'Confirming Dispatch...' : 'Confirm Order (COD / UPI)'}
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER CONFIRMATION */}
            {step === 'confirmed' && confirmedOrder && (
              <div className="flex-1 flex flex-col justify-between p-6 text-center">
                <div className="my-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">Order Dispatched to Farm!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your fresh order has been queued at the DairyLift automated bottling line.
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Order ID:</span>
                      <strong className="text-slate-900">{confirmedOrder.orderId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tracking:</span>
                      <strong className="text-forest-700">{confirmedOrder.trackingNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Slot:</span>
                      <span className="text-slate-900">{confirmedOrder.deliverySlotLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fleet Partner:</span>
                      <span className="text-slate-900">{confirmedOrder.deliveryPartnerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transit Temp:</span>
                      <span className="text-blue-700 font-bold">{confirmedOrder.currentCoolerTemperatureCelsius}°C</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleClose}
                  variant="forest"
                  className="w-full bg-forest-700 hover:bg-forest-800 text-white font-medium"
                >
                  Done & Continue Browsing
                </Button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
