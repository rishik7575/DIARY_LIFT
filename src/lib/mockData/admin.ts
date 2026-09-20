export interface AdminMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalMilkProduction: number; // litres today
  averageHealthIndex: number; // %
  totalCattle: number;
  healthyCattle: number;
  totalInvestors: number;
  totalInvested: number;
  pendingPayouts: number;
  activeOrders: number;
  totalConsumers: number;
  totalStaff: number;
  platformGrowth: number; // %
}

export interface RevenueData {
  month: string;
  milkSales: number;
  productSales: number;
  investorFees: number;
  total: number;
}

export interface MilkProductionData {
  month: string;
  target: number;
  actual: number;
}

export const ADMIN_METRICS: AdminMetrics = {
  totalRevenue: 12456000,
  monthlyRevenue: 1240000,
  totalMilkProduction: 140.2,
  averageHealthIndex: 91.4,
  totalCattle: 10,
  healthyCattle: 8,
  totalInvestors: 5,
  totalInvested: 777000,
  pendingPayouts: 44100,
  activeOrders: 234,
  totalConsumers: 8941,
  totalStaff: 4,
  platformGrowth: 23.4,
};

export const REVENUE_DATA: RevenueData[] = [
  { month: 'Apr 2026', milkSales: 480000, productSales: 320000, investorFees: 77700, total: 877700 },
  { month: 'May 2026', milkSales: 510000, productSales: 345000, investorFees: 77700, total: 932700 },
  { month: 'Jun 2026', milkSales: 495000, productSales: 298000, investorFees: 77700, total: 870700 },
  { month: 'Jul 2026', milkSales: 540000, productSales: 370000, investorFees: 77700, total: 987700 },
  { month: 'Aug 2026', milkSales: 575000, productSales: 385000, investorFees: 77700, total: 1037700 },
  { month: 'Sep 2026', milkSales: 598000, productSales: 420000, investorFees: 77700, total: 1095700 },
  { month: 'Oct 2026', milkSales: 620000, productSales: 445000, investorFees: 77700, total: 1142700 },
];

export const MILK_PRODUCTION_DATA: MilkProductionData[] = [
  { month: 'Apr 2026', target: 120, actual: 116.8 },
  { month: 'May 2026', target: 125, actual: 128.4 },
  { month: 'Jun 2026', target: 125, actual: 122.1 },
  { month: 'Jul 2026', target: 130, actual: 134.9 },
  { month: 'Aug 2026', target: 135, actual: 137.6 },
  { month: 'Sep 2026', target: 140, actual: 140.2 },
];

export const PAYOUT_SCHEDULE = [
  { investorId: 'inv001', investorName: 'Arjun Mehta', amount: 9000, dueDate: '2026-10-01', status: 'pending', tier: 'Premium' },
  { investorId: 'inv002', investorName: 'Priya Sharma', amount: 8850, dueDate: '2026-10-01', status: 'pending', tier: 'Elite' },
  { investorId: 'inv003', investorName: 'Raj Patel', amount: 8300, dueDate: '2026-10-01', status: 'pending', tier: 'Growth' },
  { investorId: 'inv004', investorName: 'Kavya Reddy', amount: 8600, dueDate: '2026-10-01', status: 'pending', tier: 'Premium' },
  { investorId: 'inv005', investorName: 'Siddharth Nair', amount: 4100, dueDate: '2026-10-01', status: 'pending', tier: 'Starter' },
];

export const ALL_USERS = [
  { id: 'u001', name: 'Arjun Mehta', email: 'investor@dairylift.com', role: 'investor', status: 'active', joinDate: '2024-03-01', kycStatus: 'verified' },
  { id: 'u002', name: 'Priya Sharma', email: 'priya@example.com', role: 'investor', status: 'active', joinDate: '2024-06-15', kycStatus: 'verified' },
  { id: 'u003', name: 'Raj Patel', email: 'raj@example.com', role: 'investor', status: 'active', joinDate: '2024-01-10', kycStatus: 'verified' },
  { id: 'u004', name: 'Kavya Reddy', email: 'kavya@example.com', role: 'investor', status: 'active', joinDate: '2024-09-05', kycStatus: 'verified' },
  { id: 'u005', name: 'Siddharth Nair', email: 'sid@example.com', role: 'investor', status: 'active', joinDate: '2025-07-01', kycStatus: 'verified' },
  { id: 'u006', name: 'Raju Kumar', email: 'staff@dairylift.com', role: 'staff', status: 'active', joinDate: '2023-09-01', kycStatus: 'verified' },
  { id: 'u007', name: 'Suresh Yadav', email: 'suresh@dairylift.com', role: 'staff', status: 'active', joinDate: '2024-01-15', kycStatus: 'verified' },
  { id: 'u008', name: 'Harjinder Singh', email: 'harjinder@dairylift.com', role: 'staff', status: 'active', joinDate: '2023-11-01', kycStatus: 'verified' },
  { id: 'u009', name: 'Pradeep More', email: 'pradeep@dairylift.com', role: 'staff', status: 'active', joinDate: '2024-04-20', kycStatus: 'verified' },
  { id: 'u010', name: 'Demo Consumer', email: 'consumer@dairylift.com', role: 'consumer', status: 'active', joinDate: '2026-01-01', kycStatus: 'not_required' },
  { id: 'u011', name: 'Admin User', email: 'admin@dairylift.com', role: 'admin', status: 'active', joinDate: '2023-06-01', kycStatus: 'verified' },
  { id: 'u012', name: 'Neha Gupta', email: 'neha@example.com', role: 'consumer', status: 'active', joinDate: '2026-03-14', kycStatus: 'not_required' },
  { id: 'u013', name: 'Vikram Joshi', email: 'vikram@example.com', role: 'consumer', status: 'pending', joinDate: '2026-09-18', kycStatus: 'not_required' },
];
