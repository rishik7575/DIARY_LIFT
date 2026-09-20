# DairyLift — Domain Assumptions & Risk Disclosure Framework (Phase 1)

This document establishes the operational, financial, biological, and e-commerce assumptions governing DairyLift Phase 1.

---

## 1. Investment & Co-Ownership Domain Assumptions

### Strict Non-Guarantee Policy
In compliance with regulatory standards and agricultural reality:
- **No Guaranteed Returns**: DairyLift does **not** offer fixed, guaranteed financial returns. Livestock assets are living biological entities subject to natural variations.
- **Illustrative Modeling Only**: All projected scenario calculators, APY run-rates, and monthly distribution estimates are explicitly designated as **illustrative sample simulations**.
- **Yield Structure Concept**:
  - *Baseline Component*: Modeled at an illustrative 1.5% monthly (~18% annualized) supported by farm milk proceeds and backed by the simulated Yield Reserve buffer.
  - *Performance Bonus*: Modeled at 0.0% to 0.5% monthly based on measured parlour milk yield, fat/SNF composite quality bonuses, and bulk sales realization.

### Yield Reserve Health Fund (Simulation)
- **Mechanics**: To protect co-owners during inevitable cow dry periods (typically 60 days before calving) or seasonal lactation dips, DairyLift models an escrow liquidity buffer (currently parameterized at 145% coverage / ₹8.45 Crores).
- **Purpose**: Provides operational runway (modeled at 6.4 months) ensuring continuous animal feed, veterinary medications, and baseline cashflow stabilization without distressing farm operations.

### Risk Disclosures & Mitigations
- **Biological / Health Risk**: Risk of cattle illness or mortality. *Mitigation Model*: Strict biosecurity sheds, ISO smart-collar temperature/rumination tracking, full vaccination logs, and simulated comprehensive livestock mortality policies.
- **Feed & Fodder Price Volatility**: Green fodder and silage costs fluctuate with seasonal monsoon patterns. *Mitigation Model*: Multi-location farm facilities (Nashik, Anand, Pune) with captive silage preservation bunkers.
- **Regulatory Status**: Phase 1 is a technology prototype. No live funds are accepted, no securities are issued, and no banking gateways are active until appropriate legal review and regulatory registration are concluded.

---

## 2. Dairy E-Commerce Domain Assumptions

### Fresh Milk Quick-Commerce Flow
- **Direct Farm-to-Consumer**: All milk products are sourced directly from DairyLift certified facilities without intermediary collection middlemen.
- **Cold-Chain Logistics**: Raw milk is chilled to < 4°C within 45 minutes of automated milking in on-farm bulk milk coolers (BMCs).
- **Delivery Slots**:
  - *Early Morning Slot*: 6:00 AM – 8:00 AM (dispatched from overnight milking batch).
  - *Evening Slot*: 5:00 PM – 7:00 PM (dispatched from afternoon milking batch).
- **Pricing & Inventory**:
  - Base pricing is configured at the facility level via the Admin portal and syncs instantaneously with the consumer catalog.
  - Delivery fees are parameterized: Free delivery on orders exceeding ₹299; flat ₹30 fee on smaller baskets.

---

## 3. Phase 1 vs Phase 2 Boundary

| Domain | Phase 1 (Current Prototype) | Phase 2 (Production Roadmap) |
| :--- | :--- | :--- |
| **User Authentication** | Context-based mock switcher with predefined personas. | JWT/OAuth2, multi-factor authentication, secure password hashing. |
| **Data Persistence** | In-memory TypeScript stores with local validation. | PostgreSQL, Prisma ORM, automated migrations, Redis caching. |
| **Payment Gateway** | Simulated one-click checkout modal. | RBI-compliant payment gateway (Razorpay/Stripe/UPI) with webhook reconciliation. |
| **IoT Collar Data** | High-fidelity mock telemetry with live threshold triggers. | MQTT broker / Kafka stream processing live collar sensor packets. |
| **Legal Agreements** | Informational terms summary placeholder. | Digital e-signing (Aadhaar eSign / DocuSign) for co-ownership deed execution. |
