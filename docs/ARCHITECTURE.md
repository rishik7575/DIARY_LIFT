# DairyLift Architecture & Technology Decisions (Phase 1)

## 1. System Overview
DairyLift is an enterprise-grade dairy ecosystem platform engineered with Next.js 14 App Router, TypeScript, and a decoupled mock service layer that mirrors an enterprise microservices architecture.

### Key Architectural Tenets
1. **Separation of Presentation & Business Logic**: UI components never directly mutate static mock arrays. All state operations route through asynchronous, typed service contracts (`cattleService`, `milkProductionService`, `healthService`, etc.) simulating RESTful network latency and business validation.
2. **Deterministic Data & Type Safety**: Centralized domain models defined with strict TypeScript interfaces and Zod schemas, enforcing relational integrity between Investors, Cattle, Farm Facilities, Milking Logs, and E-Commerce Orders.
3. **Institutional Financial Transparency**: The platform strictly avoids deceptive claims of "guaranteed returns". All yield projections are clearly labeled as illustrative models with explicit baseline parameters (1.5% fixed base + dynamic performance bonus up to 0.5%) backstopped by a 145% Yield Reserve Health fund.
4. **Clinical, Accessible Enterprise Design**: Pure White (`#FFFFFF`) and Off-White (`#FAFAFA`) content canvas paired with Deep Slate (`#0F172A`) sidebars, Muted Forest Green (`#166534`) primary triggers, and Warm Gold (`#D97706`) yield highlights.

---

## 2. Technology Stack Selection Rationale

| Layer | Chosen Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Native SSR/SSG capabilities, route groups, optimized image/font pipelines, and edge-ready API architecture for Phase 2. |
| **Styling** | Tailwind CSS v4 | Standardized design tokens, zero-runtime overhead, responsive grid/flexbox utilities without custom layout bugs. |
| **Component System** | shadcn/ui + Radix UI | WAI-ARIA compliant, unstyled headless primitives providing keyboard navigation, accessible dialogs, selects, and data tables. |
| **Visual Accents** | Aceternity UI + Framer Motion | Tasteful particle canvas (`SparklesCore`) and micro-interactions without performance penalties or layout shifting. |
| **Data Visualization** | Recharts | Composable SVG charting with high responsiveness for yield curves, milk production flow, and platform revenue metrics. |
| **Client State** | Zustand | Lightweight, hook-based global store for cart persistence and transient UI state. |
| **Validation** | Zod | Runtime schema validation for data entry forms (milking yields, vet reports, checkout addresses). |

---

## 3. Directory Layout & Boundaries

- `src/lib/types/`: Pure domain types and relational entity models.
- `src/lib/services/`: Asynchronous service layer defining API contracts.
- `src/lib/mockData/`: High-fidelity relational datasets representing Indian dairy operations.
- `src/components/ui/`: Reusable shadcn/ui design primitives.
- `src/components/layout/`: Universal portal shell (`PortalLayout.tsx`) with collapsible mobile navigation and role context.
- `src/app/`: Four discrete portal route trees (`/admin`, `/staff`, `/investor`, `/consumer`) with route guards (`PortalGuard.tsx`).
