# DairyLift — Enterprise Dairy Ecosystem & Livestock Co-Ownership ERP

![DairyLift Banner](https://img.shields.io/badge/Architecture-Next.js%2014%20App%20Router-166534?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Coverage](https://img.shields.io/badge/Yield%20Reserve%20Health-145%25%20Optimal-D97706?style=for-the-badge)

DairyLift is an institutional-grade, tech-enabled dairy farming, quick-commerce, and agricultural asset co-ownership platform bridging urban capital with high-yield rural livestock farming.

---

## 🌟 Key Highlights & Core Business Architecture

- **Sustainable Yield Structure**: Operates on a verified **1.5% fixed monthly base yield (18% APY)**, plus a dynamic performance bonus (up to **0.5% monthly**) tied to verifiable parlour milk yields.
- **Yield Reserve Health Fund**: Backstopped by a **145% escrow liquidity buffer** (₹8.45 Crores escrow buffer audited by Deloitte Agritech Assurance) guaranteeing 6.4 months of baseline cashflow protection during natural dry cycles.
- **100% Capital Asset Protection**: Livestock mortality policies underwritten by The New India Assurance Co. Ltd.
- **Zero Layout Overlap & Strict Design Tokens**: Built strictly with CSS Grid and Flexbox (no custom absolute positioning) using Deep Slate (`#0F172A`), Forest Green (`#166534`), and Warm Gold (`#D97706`).

---

## 🏛️ The 4 Unified Portals

| Portal | Route | Description & Features |
| :--- | :--- | :--- |
| **Authentication Gateway** | `/auth` | Role-based entry with 1-click credential autofill for Master Admin, Farm Staff, Investor, and Consumer. |
| **Master Admin Command Center** | `/admin` | Executive KPIs, herd analytics, Recharts cashflow trends, cattle biological state transitions, multi-facility shed occupancy, and order fulfillment. |
| **Farm Operations ERP** | `/staff` | AM/PM parlour milking logger with duplicate-entry prevention, composite Fat/SNF quality grading, smart-collar IoT alert feeds, and clinical exam filing. |
| **Investor Financial Suite** | `/investor` | Portfolio valuation, Recharts base vs bonus yield curves, assigned cattle biometrics (live collar telemetry), audited dividend ledger with NEFT references, and scenario modeling calculator. |
| **Consumer Quick-Commerce** | `/consumer` | Sub-15 min A2 milk & bilona ghee catalog, category filters, slide-over Cart Drawer with real-time fee calculation, delivery slot picker (Early Morning / Evening), and co-ownership discovery (`/consumer/invest`). |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server & Client Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with strict enterprise theme tokens
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives, CVA) & Aceternity UI effects
- **Charts & Visualization**: [Recharts](https://recharts.org/)
- **Motion & Micro-interactions**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/rishik7575/DIARY_LIFT.git

# Navigate to project directory
cd DIARY_LIFT

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Documentation

- [Architecture & Design System](docs/ARCHITECTURE.md)
- [Role Permissions & RBAC Matrix](docs/ROLE_PERMISSIONS.md)
- [Phase 2 REST API Contracts](docs/API_CONTRACTS.md)
- [PostgreSQL / Prisma Roadmap](docs/PHASE2_ROADMAP.md)
- [Verification & Walkthrough Report](docs/WALKTHROUGH.md)

---

## 📄 License
Proprietary & Confidential — DairyLift Inc. All rights reserved.
