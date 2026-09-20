# DairyLift Phase 2 Architecture & Database Migration Roadmap

## 1. Database Architecture (PostgreSQL + Prisma ORM)

In Phase 2, the client service layer will connect to a PostgreSQL database via Prisma ORM.

### Entity Relationship Model
- `User`: Base identity with authentication credentials, RBAC role enum, KYC profile.
- `InvestorProfile`: 1:1 with User where role is INVESTOR.
- `FarmFacility`: 1:N with `Shed` and `Cattle`.
- `Cattle`: N:1 with `InvestorProfile` (optional allocation) and `FarmFacility`.
- `DailyMilkLog`: N:1 with `Cattle` and `User` (operator). Unique constraint on `(cattle_id, log_date, session)`.
- `VeterinaryAlert`: N:1 with `Cattle` and `User` (assigned veterinarian).
- `Product`: 1:N with `ProductVariant` and `InventoryItem`.
- `Order`: N:1 with `User` (consumer), 1:N with `OrderItem`.

---

## 2. Transition Plan from Phase 1 to Phase 2
1. **Zero Frontend Rewrite**: The client-side services in `src/lib/services/` already adhere to Promise-based async contracts. In Phase 2, the internal mock resolution (`Promise.resolve(...)`) will simply be replaced by `fetch('/api/v1/...')` or TanStack Query mutations.
2. **Authentication & JWT**: Phase 1 mock role switcher will be replaced by NextAuth / Auth.js with JWT session cookies and secure password hashing (Argon2id).
3. **IoT Real-Time Streams**: WebSocket / MQTT ingestion pipeline for collar telemetry directly inserting into high-throughput time-series tables (TimescaleDB extension on Postgres).
