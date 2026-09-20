/**
 * DairyLift Enterprise Order, Cart, and Fulfillment Type Definitions
 */

export type OrderStatus =
  | 'ORDER_RECEIVED'
  | 'CHILLED_PACKING'
  | 'OUT_FOR_COLD_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type DeliverySlotTime =
  | 'EARLY_MORNING_06_08_AM'
  | 'MORNING_08_10_AM'
  | 'EVENING_05_07_PM';

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  flatHouseNo: string;
  societyBuilding: string;
  streetArea: string;
  city: string;
  pincode: string;
  deliveryNotes?: string;
}

export interface OrderLineItem {
  productId: string;
  productName: string;
  variantId: string;
  sizeLabel: string;
  unitPriceINR: number;
  quantity: number;
  totalLinePriceINR: number;
  emojiIcon: string;
}

export interface OrderFulfillment {
  orderId: string;
  userId: string;
  placedAt: string;          // ISO 8601
  status: OrderStatus;
  items: OrderLineItem[];
  subtotalINR: number;
  deliveryFeeINR: number;    // Free over ₹499
  coldPackingFeeINR: number; // ₹0 complimentary eco-gel
  estimatedGstINR: number;
  grandTotalINR: number;
  deliverySlot: DeliverySlotTime;
  deliverySlotLabel: string;
  deliveryAddress: DeliveryAddress;
  deliveryPartnerName?: string;
  currentCoolerTemperatureCelsius?: number; // E.g. 3.4°C
  trackingNumber: string;
  estimatedDeliveryTime: string;
}
