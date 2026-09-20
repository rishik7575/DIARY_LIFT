# DairyLift Role & Permissions Matrix (RBAC)

This document establishes the strict permission boundaries governing the four user roles in DairyLift.

## 1. Role Profiles

| Role | Primary User Persona | Primary Workspace |
| :--- | :--- | :--- |
| **Admin** | Farm Owners, Operations Directors, CFO, Lead System Auditors | `/admin` (Master Command Center) |
| **Staff** | Veterinarians, Parlour Operators, Milking Supervisors, Herd Managers | `/staff` (Mobile-First Farm ERP) |
| **Investor** | High-Net-Worth Individuals, Agri-Asset Co-Owners, Family Offices | `/investor` (Investor Financial Suite) |
| **Consumer** | Dairy Retail Customers, Quick-Commerce Shoppers | `/consumer` (12-Min Quick Store) |

---

## 2. Granular Capability Matrix

| Feature / Domain Action | Consumer | Investor | Staff | Admin |
| :--- | :---: | :---: | :---: | :---: |
| **Browse Dairy Products & Categories** | Full | Full | Full | Full |
| **Cart Management & Checkout Simulation** | Full | Full | Full | Full |
| **View Investment Opportunities** | View Only | View & Apply | View Only | Full (Create/Edit) |
| **View Personal Investment Portfolio** | Denied | Own Assets Only | Denied | Full (All Investors) |
| **View Livestock Biometrics (Assigned)** | Denied | Own Cattle Only | Full (Farm Cattle) | Full (All Herds) |
| **Log AM/PM Milking Yields** | Denied | Denied | Full (Assigned Facility) | Full (Any Facility) |
| **Create Veterinary Health Reports** | Denied | Denied | Full (Licensed Vets) | Full & Review |
| **Register New Cattle / Tag Allocation** | Denied | Denied | Draft Entry | Full Approval |
| **Acknowledge IoT Veterinary Alerts** | Denied | Denied | Full | Full |
| **E-Commerce Order Status Updates** | Denied | Denied | Pack & Dispatch | Full (Refunds/Cancel) |
| **Disburse Monthly Dividends** | Denied | Denied | Denied | Full Execution |
| **View System Audit Logs & Finances** | Denied | Denied | Denied | Full Access |

---

## 3. Account Progression Rules
- **Consumer to Investor Upgrades**: Consumers can explore investment plans and submit an application draft. Once identity verification (KYC/PAN) is approved in Phase 2, the user's role is upgraded to `investor` without duplicating credentials or losing order history.
