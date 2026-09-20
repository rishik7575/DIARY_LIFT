# DairyLift — Feature & Module Map (Phase 1)

This document provides a comprehensive mapping of all functional modules across DairyLift's four connected portals.

---

## 1. Public Portal & Landing Page (`/` and `/auth`)

| Module | Route | Capabilities & Interactions |
| :--- | :--- | :--- |
| **Brand Hero & Value Proposition** | `/` | Editorial headline, high-contrast agronomic benefits, and institutional mission. |
| **4-Portal Launcher** | `/` | Direct interactive navigation to Admin Command, Staff ERP, Investor Suite, and Consumer Catalog. |
| **Operational Proof Points** | `/` | IoT telemetry showcase, cold-chain logistics overview, and veterinary care standards. |
| **Authentication Gateway** | `/auth` | Role-based login gateway with 1-click test persona autofill for Admin, Staff, Investor, and Consumer roles. |

---

## 2. Admin Portal (`/admin`)

| Module | View / Tab | Capabilities & Workflows |
| :--- | :--- | :--- |
| **Executive Dashboard** | `Overview` | Live KPIs for total herd size, lactating count, daily parlour milk volume, active orders, and revenue trends via Recharts. |
| **Herd & Facility Registry** | `Cattle Registry` | Searchable, breed-filterable cattle database. Detailed modal inspecting RFID tag, lactation stage, genetic pedigree, and health records. |
| **IoT Sensor Monitoring** | `Shed Sensors` | Real-time telemetry for Nashik, Anand, and Pune sheds. Live threshold adjustment modal with audit trail. |
| **Plan Governance Lifecycle** | `Investment Plans` | Enterprise plan versioning workflow: `DRAFT` $\rightarrow$ `IN_REVIEW` $\rightarrow$ `PUBLISHED`. Plan creation modal, immutable change log, and version comparisons. |
| **Store Retail Manager** | `E-Commerce` | Inline product catalog pricing and inventory management. Instant bidirectional synchronization with consumer catalog. |
| **Financial Ledger** | `Finance & P&L` | Auditable ledger tracking milk dispatch revenues, veterinary expenses, cattle feed procurement, and simulated payouts. |
| **Order Dispatch Center** | `Orders` | Real-time fulfillment queue with state transition actions: `CONFIRMED` $\rightarrow$ `PACKED` $\rightarrow$ `DISPATCHED` $\rightarrow$ `DELIVERED`. |

---

## 3. Staff Portal (`/staff`)

| Module | View / Section | Capabilities & Workflows |
| :--- | :--- | :--- |
| **Shift Dashboard** | `Daily Tasks` | Actionable checklist of pending parlour milkings, veterinary checkups, and shed climate checks. |
| **Parlour Milking Logger** | `Milking Session` | Input form for AM/PM milking yields with duplicate prevention, date validation, and instant composite quality grading (`Grade A+`, `Grade A`, `Standard`) based on Fat % and SNF %. |
| **IoT Sensor Action Center** | `Environmental Action` | Real-time shed threshold breach notifications with one-click mitigation logging (e.g. activating shed misters and louver fans). |
| **Veterinary Health Intake** | `Health Records` | Clinical exam filing, vaccination logging, treatment prescription entry, and automated follow-up scheduling. |
| **Cattle Directory & Lookup** | `Herd Lookup` | Quick RFID/ear-tag search for cattle history, biological status, and lactation curve review. |

---

## 4. Investor Portal (`/investor`)

| Module | Route / Section | Capabilities & Workflows |
| :--- | :--- | :--- |
| **Portfolio Valuation** | `/investor` | Total capital committed, lifetime sample distributions, and current active cattle allocations. |
| **Yield Reserve Health Gauge** | `/investor` | Visual indicator of the 145% simulated reserve buffer (₹8.45 Cr) explaining cashflow stabilization across dry periods. |
| **Livestock Biometric Telemetry** | `/investor/cattle/[id]` | Per-cow health status, lactation progress, smart collar activity, and parlour milk yield trends. |
| **Illustrative Scenario Modeling** | `/investor` | Interactive calculator modeling 12, 24, and 36-month tenure projections with clear illustrative mock disclaimers. |
| **Audited Dividend Ledger** | `/investor/portfolio` | Historical transaction ledger with mock NEFT reference numbers, tax withholdings, and statements download placeholder. |

---

## 5. Consumer Quick-Commerce Portal (`/consumer`)

| Module | Route / Section | Capabilities & Workflows |
| :--- | :--- | :--- |
| **Farm-Fresh Catalog** | `/consumer` | Category filtering (Milk, Ghee, Paneer, Curd), search, and real-time inventory badges. |
| **Product Inspection Modal** | `/consumer` | Nutritional breakdown, cold-chain lab test results, and batch origin farm details. |
| **Slide-over Cart Drawer** | Global | Real-time subtotal calculation, free shipping threshold progress, and delivery slot picker (Early Morning / Evening). |
| **Simulated Checkout** | Global | Address form with validation, simulated mock payment selector, and instant order placement. |
| **Order Status Tracker** | `/consumer` | Live order timeline tracking progression from confirmation to doorstep delivery. |
| **Co-Ownership Discovery** | `/consumer/invest` | Educational discovery bridge explaining livestock co-ownership eligibility, tenure, and transparent terms. |
