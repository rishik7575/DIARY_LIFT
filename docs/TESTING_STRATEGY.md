# DairyLift — Testing Strategy & Verification Plan (Phase 1)

This document specifies the quality assurance, verification methodologies, and validation checkpoints implemented for DairyLift Phase 1.

---

## 1. Type Safety & Build Verification

- **Strict TypeScript Validation**: Run `npx tsc --noEmit` across all modules.
  - Ensures no `any` leaks in domain entities.
  - Enforces type safety across service responses and component prop contracts.
- **Next.js Production Build Validation**: Run `npm run build`.
  - Verifies that all client (`'use client'`) and server components compile without hydration mismatches or dynamic import issues.

---

## 2. Form & Data Entry Validation Matrix

| Workflow | Form / Input | Validation Rules & Guardrails |
| :--- | :--- | :--- |
| **Parlour Milking** | `cattleId` | Must match an existing registered cow in the herd. |
| **Parlour Milking** | `session` & `milkingDate` | **Duplicate Prevention**: Rejects submissions if a record for the identical `cattleId` + `date` + `session` already exists in `milkProductionService`. |
| **Parlour Milking** | `yieldLiters` | Must be a positive numeric value between 0.5L and 35.0L per cow per session. |
| **Parlour Milking** | `fatPercentage` & `snfPercentage` | Fat must be 3.0% - 8.5%; SNF must be 7.5% - 11.0%. Automatically evaluates composite quality grade (`Grade A+`, `Grade A`, `Standard`). |
| **Cattle Intake** | `earTagNumber` & `rfidTag` | Must be unique across all active facilities. |
| **E-Commerce Checkout** | Delivery Address | Street, city, and 6-digit postal PIN code required before proceeding. |
| **E-Commerce Checkout** | Delivery Slot | Explicit selection required (`EARLY_MORNING` or `EVENING`). |

---

## 3. Role-Based Navigation & Guard Testing

| Role Persona | Permitted Routes | Forbidden Routes (Redirected) |
| :--- | :--- | :--- |
| **Master Admin** | `/admin`, `/staff`, `/investor`, `/consumer`, `/` | None. Full cross-portal administrative visibility. |
| **Farm Staff & Vet** | `/staff`, `/consumer`, `/` | `/admin` (Redirects to `/staff`), `/investor` (Redirects to `/staff`). |
| **Asset Co-Owner / Investor** | `/investor`, `/consumer`, `/` | `/admin` (Redirects to `/investor`), `/staff` (Redirects to `/investor`). |
| **Retail Consumer** | `/consumer`, `/consumer/invest`, `/` | `/admin`, `/staff`, `/investor` (Redirects to `/consumer`). |

---

## 4. Operational Workflow Verification Scenarios

### Workflow A: Environmental Sensor Alert & Mitigation
1. Admin or Staff views live sensor feed showing Nashik Shed 2 temperature at 32.4°C (Exceeding 30.0°C threshold).
2. Staff clicks **"Execute Mitigation"** action.
3. System logs action (*"Activated high-pressure roof misters & exhaust louvers"*), records staff timestamp, and resets simulated temperature to 28.5°C across both Admin and Staff dashboards.

### Workflow B: Investment Plan Governance Lifecycle
1. Admin opens Investment Management tab and clicks **"New Plan Draft"**.
2. Fills out minimum contribution, tenure, and illustrative parameters $\rightarrow$ Saves as `DRAFT`.
3. Plan undergoes state transitions: `DRAFT` $\rightarrow$ `SUBMIT FOR REVIEW` $\rightarrow$ `APPROVE & PUBLISH`.
4. System records an immutable entry in `planAuditLog` and publishes the updated configuration to the Investor portal.

### Workflow C: Retail Store Price Update
1. Admin edits fresh A2 Milk 1L price from ₹90 to ₹95 in the Admin E-Commerce tab.
2. Changes save instantly to `productService`.
3. Consumer navigates to `/consumer` $\rightarrow$ Product card immediately displays updated ₹95 price with updated cart calculations.

---

## 5. Responsive Design Verification

- **Breakpoints Tested**:
  - Desktop: 1440px+ (Full sidebar navigation, 4-column KPI grids, dual-axis Recharts).
  - Tablet: 768px – 1024px (2-column grids, collapsible responsive sidebar).
  - Mobile: 375px – 430px (Slide-out sheet navigation, single-column KPI cards, horizontal scrollable tables, full-width cart drawer).
