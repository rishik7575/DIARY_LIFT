# DairyLift Draft API Contracts & Service Specifications

These contracts define the asynchronous interfaces implemented in Phase 1's client service layer, directly mapping to Phase 2 REST/JSON API endpoints.

## 1. Cattle Service (`/api/v1/cattle`)
- `GET /api/v1/cattle` -> List cattle assets with filters (`breed`, `status`, `facilityId`, `investorId`).
- `GET /api/v1/cattle/:id` -> Retrieve cattle details with complete lactation metrics and IoT telemetry.
- `POST /api/v1/cattle` -> Register new cattle (RFID, ear tag, breed, birth date, facility).
- `PATCH /api/v1/cattle/:id/status` -> Update biological status (`Milking`, `Dry`, `Medical Observation`).

## 2. Milk Production Service (`/api/v1/milk-production`)
- `GET /api/v1/milk-production/daily?date=YYYY-MM-DD` -> Fetch all AM/PM log entries for a given date.
- `POST /api/v1/milk-production/log` -> Submit daily milking record.
  - *Validation*: Reject negative volume, verify session (`AM` vs `PM`), prevent duplicate entries for `(cattleId, date, session)`.
- `GET /api/v1/milk-production/stats` -> Aggregate production metrics (Total volume, Avg Fat %, Avg SNF %).

## 3. Veterinary Health Service (`/api/v1/health`)
- `GET /api/v1/health/alerts` -> List active IoT collar telemetry alert flags.
- `POST /api/v1/health/alerts/:id/acknowledge` -> Mark alert acknowledged by staff.
- `POST /api/v1/health/reports` -> Submit veterinary diagnosis, medication, and follow-up date.

## 4. Investment & Yield Service (`/api/v1/investments`)
- `GET /api/v1/investments/plans` -> List configured asset allocation plans with tenure and minimums.
- `GET /api/v1/investments/portfolio/:investorId` -> Retrieve investor portfolio, dividend ledger, and yield reserve health.
- `POST /api/v1/investments/apply` -> Submit application draft (Subject to eligibility and legal review).

## 5. E-Commerce Service (`/api/v1/commerce`)
- `GET /api/v1/commerce/products` -> Catalog list with category filters.
- `GET /api/v1/commerce/products/:id` -> Product details, nutritional facts, storage guidelines.
- `POST /api/v1/commerce/orders` -> Submit new order draft with delivery address and slot.
- `GET /api/v1/commerce/orders/user/:userId` -> Retrieve consumer order history.
