# DairyLift — Mock Data Models & Schema Specifications (Phase 1)

This document outlines the TypeScript domain models and relational entity structures powering DairyLift Phase 1.

---

## 1. Cattle Asset Model (`CattleAsset`)

```typescript
export type BiologicalStatus = 
  | 'LACTATING'          // Actively milked twice daily
  | 'DRY_GESTATION'      // Pre-calving rest period (approx 60 days)
  | 'HEIFER_TRANSITION'  // Young female prior to first calving
  | 'MEDICAL_QUARANTINE';// Temporarily isolated for veterinary care

export interface CattleAsset {
  id: string;                         // e.g. 'DL-C-001'
  earTagNumber: string;               // e.g. 'IN-MH-10294-GIR'
  rfidTag: string;                    // 15-digit ISO 11784/11785 RFID
  name: string;                       // e.g. 'Lakshmi'
  breed: 'Gir' | 'Sahiwal' | 'Red Sindhi' | 'Murrah Buffalo' | 'HF Cross';
  dateOfBirth: string;                // ISO Date string
  lactationCycle: number;             // Current lactation count (e.g. 2)
  biologicalStatus: BiologicalStatus;
  currentDailyYieldLiters: number;    // Measured parlour yield
  averageFatPercentage: number;       // e.g. 4.8%
  averageSNFPercentage: number;       // e.g. 8.9%
  assignedFarmId: string;             // e.g. 'farm-nashik-01'
  assignedShedId: string;             // e.g. 'shed-nashik-02'
  allocatedInvestorId?: string;       // Linked co-owner if allocated
  smartCollarId: string;              // IoT device pairing ID
  healthSummary: {
    lastExamDate: string;
    vaccinationStatus: 'UP_TO_DATE' | 'DUE_SOON' | 'OVERDUE';
    temperatureCelsius: number;
    ruminationMinutesPerDay: number;
    activeAlerts: number;
  };
}
```

---

## 2. Milk Production Session Model (`MilkingRecord`)

```typescript
export interface MilkingRecord {
  id: string;                         // e.g. 'MILK-20260920-AM-001'
  cattleId: string;                   // Reference to CattleAsset.id
  farmId: string;
  milkingDate: string;                // 'YYYY-MM-DD'
  session: 'AM' | 'PM';               // Morning or Evening milking
  yieldLiters: number;                // Validated positive number (e.g. 11.4)
  fatPercentage: number;              // Composite sample Fat (e.g. 4.85)
  snfPercentage: number;              // Solids-Not-Fat (e.g. 9.10)
  compositeQualityGrade: 'Grade A+' | 'Grade A' | 'Standard' | 'Sub-Standard';
  recordedByStaffId: string;          // Staff user identifier
  recordedTimestamp: string;          // ISO Timestamp
  notes?: string;
}
```

---

## 3. Farm Facility & Shed Model (`FarmFacility`, `Shed`)

```typescript
export interface Shed {
  id: string;                         // e.g. 'shed-nashik-02'
  name: string;                       // 'Lactation Parlour Shed B'
  maxCapacity: number;                // Max animal stalls (e.g. 40)
  currentOccupancy: number;           // Calculated live count
  environmentalSensors: {
    temperatureCelsius: number;       // e.g. 28.4
    humidityPercentage: number;       // e.g. 62%
    ammoniaPpm: number;               // Air quality marker (< 15 ppm ideal)
    lastReadingTimestamp: string;
  };
}

export interface FarmFacility {
  id: string;                         // 'farm-nashik-01'
  name: string;                       // 'DairyLift Apex Facility - Nashik'
  location: string;                   // 'Dindori Valley, Nashik, Maharashtra'
  totalAreaAcres: number;
  veterinarianInCharge: string;
  totalActiveCattle: number;
  sheds: Shed[];
  bulkCoolerCapacityLiters: number;
}
```

---

## 4. Investment Plan Governance Model (`InvestmentPlanConfig`)

```typescript
export type PlanLifecycleStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface PlanAuditLogEntry {
  timestamp: string;
  action: 'CREATED_DRAFT' | 'SUBMITTED_FOR_REVIEW' | 'APPROVED_AND_PUBLISHED' | 'ARCHIVED' | 'EDITED_PARAMETERS';
  author: string;
  diffSummary: string;
  previousStatus?: PlanLifecycleStatus;
  newStatus: PlanLifecycleStatus;
}

export interface InvestmentPlanConfig {
  id: string;                         // e.g. 'plan-milking-gir'
  name: string;                       // 'Milking Gir Cow Unit'
  minimumContributionINR: number;     // e.g. 250000
  tenureMonths: number;               // 12, 24, or 36
  baselineMonthlyYieldRate: number;   // 0.015 (1.5% illustrative monthly base)
  performanceBonusCeiling: number;    // 0.005 (up to 0.5% dynamic bonus)
  targetCattleAllocation: string;     // '2x Purebred A2 Gir Cows'
  riskCategory: 'Conservative' | 'Low-Medium' | 'Medium';
  illustrativeAnnualRunRateAPY: string; // '18.0% - 24.0% (Illustrative Demo)'
  riskDisclosureText: string;
  lifecycleStatus: PlanLifecycleStatus;
  version: string;                    // 'v3.0'
  effectiveDate: string;
  affectsExistingInvestors: boolean;
  auditHistory: PlanAuditLogEntry[];
}
```

---

## 5. E-Commerce Product & Order Models (`Product`, `OrderFulfillment`)

```typescript
export interface ProductVariant {
  id: string;
  size: string;                       // e.g. '1 Liter Bottle', '500ml Pack'
  priceINR: number;
  inventoryStock: number;
}

export interface Product {
  id: string;                         // e.g. 'prod-a2-milk-1l'
  title: string;
  category: 'Milk' | 'Ghee' | 'Paneer' | 'Curd' | 'Butter';
  description: string;
  imageUrl: string;
  coldChainPreserved: boolean;
  labTestedFatContent: string;
  variants: ProductVariant[];
  featured: boolean;
}

export interface OrderFulfillment {
  id: string;                         // e.g. 'ORD-2026-9104'
  customerName: string;
  deliveryAddress: string;
  deliverySlot: 'EARLY_MORNING' | 'EVENING';
  orderTimestamp: string;
  status: 'CONFIRMED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED';
  totalAmountINR: number;
  items: Array<{
    productId: string;
    productTitle: string;
    variantSize: string;
    unitPriceINR: number;
    quantity: number;
  }>;
}
```
