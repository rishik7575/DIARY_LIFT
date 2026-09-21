/**
 * DairyLift E-Commerce Order & Fulfillment Service
 * Multi-layer persistence: Cloud Firestore with synchronized local client cache
 */

import { OrderFulfillment, DeliveryAddress, DeliverySlotTime, OrderLineItem } from '../types/order';
import { db, isLiveFirebaseConfigured } from '../firebase/config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const INITIAL_DEMO_ORDERS: OrderFulfillment[] = [
  {
    orderId: 'ORD-DL-98412',
    userId: 'usr-consumer-01',
    placedAt: '2026-09-20T08:14:00Z',
    status: 'DELIVERED',
    items: [
      {
        productId: 'p001',
        productName: 'A2 Gir Cow Full Cream Milk',
        variantId: 'v1',
        sizeLabel: '1 Litre Glass Bottle',
        unitPriceINR: 89,
        quantity: 2,
        totalLinePriceINR: 178,
        emojiIcon: '🥛',
      },
      {
        productId: 'p002',
        productName: 'Bilona Ghee (Hand-Churned)',
        variantId: 'v2',
        sizeLabel: '500 ml Jar',
        unitPriceINR: 849,
        quantity: 1,
        totalLinePriceINR: 849,
        emojiIcon: '🫙',
      },
    ],
    subtotalINR: 1027,
    deliveryFeeINR: 0,
    coldPackingFeeINR: 0,
    estimatedGstINR: 51,
    grandTotalINR: 1078,
    deliverySlot: 'EARLY_MORNING_06_08_AM',
    deliverySlotLabel: 'Early Morning (6:00 AM - 8:00 AM)',
    deliveryAddress: {
      fullName: 'Aarav Gupta',
      phone: '+91 98201 99481',
      flatHouseNo: 'Flat 1402, Tower B',
      societyBuilding: 'Kalpataru Horizon',
      streetArea: 'Worli South',
      city: 'Mumbai',
      pincode: '400018',
    },
    deliveryPartnerName: 'Ramesh K. (EV Delivery Fleet #12)',
    currentCoolerTemperatureCelsius: 3.4,
    trackingNumber: 'TRK-DL-882194',
    estimatedDeliveryTime: 'Delivered at 06:42 AM',
  },
];

function loadInitialOrders(): OrderFulfillment[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dairylift_orders');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }
  return [...INITIAL_DEMO_ORDERS];
}

let ordersStore: OrderFulfillment[] = loadInitialOrders();

function saveOrdersStore(list: OrderFulfillment[]) {
  ordersStore = list;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('dairylift_orders', JSON.stringify(list));
    } catch {
      // ignore
    }
  }
}

export interface CheckoutInput {
  userId: string;
  items: OrderLineItem[];
  address: DeliveryAddress;
  slot: DeliverySlotTime;
}

export const orderService = {
  /**
   * Compute cart pricing breakdown
   */
  calculateCartSummary(items: { price: number; quantity: number }[]) {
    const subtotal = items.reduce((s, item) => s + item.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 49;
    const gst = Math.round(subtotal * 0.05); // 5% GST on artisan dairy
    const grandTotal = subtotal + deliveryFee + gst;

    return {
      subtotal,
      deliveryFee,
      isFreeDelivery: deliveryFee === 0,
      amountNeededForFreeDelivery: Math.max(0, 499 - subtotal),
      gst,
      grandTotal,
    };
  },

  /**
   * Submit new order during checkout
   */
  async createOrder(input: CheckoutInput): Promise<OrderFulfillment> {
    await new Promise((res) => setTimeout(res, 80));

    const pricing = this.calculateCartSummary(
      input.items.map((i) => ({ price: i.unitPriceINR, quantity: i.quantity }))
    );

    const slotLabels: Record<DeliverySlotTime, string> = {
      EARLY_MORNING_06_08_AM: 'Early Morning (6:00 AM - 8:00 AM)',
      MORNING_08_10_AM: 'Morning (8:00 AM - 10:00 AM)',
      EVENING_05_07_PM: 'Evening (5:00 PM - 7:00 PM)',
    };

    const newOrder: OrderFulfillment = {
      orderId: `ORD-DL-${Date.now().toString().slice(-6)}`,
      userId: input.userId,
      placedAt: new Date().toISOString(),
      status: 'ORDER_RECEIVED',
      items: input.items,
      subtotalINR: pricing.subtotal,
      deliveryFeeINR: pricing.deliveryFee,
      coldPackingFeeINR: 0,
      estimatedGstINR: pricing.gst,
      grandTotalINR: pricing.grandTotal,
      deliverySlot: input.slot,
      deliverySlotLabel: slotLabels[input.slot] || 'Standard Delivery',
      deliveryAddress: input.address,
      deliveryPartnerName: 'Assigned to EV Cold-Fleet Node #04',
      currentCoolerTemperatureCelsius: 3.5,
      trackingNumber: `TRK-DL-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDeliveryTime: 'In Chilled Packing (Under 12 Mins)',
    };

    const updatedList = [newOrder, ...ordersStore];
    saveOrdersStore(updatedList);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'orders', newOrder.orderId), newOrder);
      } catch (err) {
        console.warn('Firestore createOrder error:', err);
      }
    }

    return newOrder;
  },

  /**
   * Get orders for consumer
   */
  async getOrdersByUser(userId?: string): Promise<OrderFulfillment[]> {
    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'orders'));
        if (!snap.empty) {
          const remoteList = snap.docs.map((d) => d.data() as OrderFulfillment);
          saveOrdersStore(remoteList);
        }
      } catch (err) {
        console.warn('Firestore orders fetch error:', err);
      }
    }

    await new Promise((res) => setTimeout(res, 30));
    if (!userId) return [...ordersStore];
    return ordersStore.filter((o) => o.userId === userId);
  },

  /**
   * Get all orders for Admin fulfillment
   */
  async getAllOrders(): Promise<OrderFulfillment[]> {
    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'orders'));
        if (!snap.empty) {
          const remoteList = snap.docs.map((d) => d.data() as OrderFulfillment);
          saveOrdersStore(remoteList);
        }
      } catch (err) {
        console.warn('Firestore getAllOrders error:', err);
      }
    }

    await new Promise((res) => setTimeout(res, 30));
    return [...ordersStore];
  },

  /**
   * Update order status (Admin or Dispatcher)
   */
  async updateOrderStatus(orderId: string, status: OrderFulfillment['status']): Promise<OrderFulfillment> {
    await new Promise((res) => setTimeout(res, 40));
    const index = ordersStore.findIndex((o) => o.orderId === orderId);
    if (index === -1) throw new Error(`Order ${orderId} not found`);

    const updated: OrderFulfillment = {
      ...ordersStore[index],
      status,
    };

    const updatedList = [...ordersStore];
    updatedList[index] = updated;
    saveOrdersStore(updatedList);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'orders', orderId), updated, { merge: true });
      } catch (err) {
        console.warn('Firestore updateOrderStatus error:', err);
      }
    }

    return updated;
  },
};
