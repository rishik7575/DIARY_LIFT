/**
 * DairyLift Central Notification Service
 * Shared notification engine across IoT monitoring, cattle health, inventory, and system workflows.
 */

export type NotificationSeverity = 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
export type NotificationSource =
  | 'ENVIRONMENT'
  | 'HERD_HEALTH'
  | 'MILK_PRODUCTION'
  | 'INVENTORY'
  | 'ORDERS'
  | 'INVESTMENT'
  | 'SYSTEM';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  source: NotificationSource;
  severity: NotificationSeverity;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

let notificationsStore: AppNotification[] = [
  {
    id: 'notif-001',
    title: 'High Heat Index in Shed 2',
    message: 'Ambient temperature reached 32.4°C exceeding the 30.0°C safety threshold.',
    source: 'ENVIRONMENT',
    severity: 'CRITICAL',
    timestamp: '2026-09-20T11:42:00Z',
    isRead: false,
    actionUrl: '/staff',
    actionLabel: 'Execute Mitigation',
  },
  {
    id: 'notif-002',
    title: 'Prophylactic Vaccine Due in 3 Days',
    message: 'Foot-and-Mouth (FMD) booster scheduled for 140 A2 Gir cows in Shed 1.',
    source: 'HERD_HEALTH',
    severity: 'WARNING',
    timestamp: '2026-09-20T08:00:00Z',
    isRead: false,
    actionUrl: '/staff',
    actionLabel: 'View Schedule',
  },
  {
    id: 'notif-003',
    title: 'Low Inventory Alert: Vedic Bilona Ghee 500ml',
    message: 'Stock level reached 14 jars (threshold: 20 jars). Replenishment required.',
    source: 'INVENTORY',
    severity: 'WARNING',
    timestamp: '2026-09-20T14:15:00Z',
    isRead: false,
    actionUrl: '/admin',
    actionLabel: 'Manage Stock',
  },
  {
    id: 'notif-004',
    title: 'AM Milking Batch Approved (Grade-A+)',
    message: 'Recorded 164.5L at 4.6% Fat / 8.9% SNF. Approved for premium direct commerce.',
    source: 'MILK_PRODUCTION',
    severity: 'SUCCESS',
    timestamp: '2026-09-20T06:45:00Z',
    isRead: true,
    actionUrl: '/staff',
    actionLabel: 'View Batch Log',
  },
  {
    id: 'notif-005',
    title: 'Monthly NEFT Dividend Distribution Run',
    message: '₹3,750 credited to Arjun Mehta (INV-DL-1001) for Milking Gir Cow Unit allocation.',
    source: 'INVESTMENT',
    severity: 'INFO',
    timestamp: '2026-09-01T10:00:00Z',
    isRead: true,
    actionUrl: '/investor',
    actionLabel: 'View Ledger',
  },
];

export const notificationService = {
  async getNotifications(filter?: { source?: NotificationSource; unreadOnly?: boolean }): Promise<AppNotification[]> {
    await new Promise((res) => setTimeout(res, 20));
    let items = [...notificationsStore];
    if (filter?.source) items = items.filter((n) => n.source === filter.source);
    if (filter?.unreadOnly) items = items.filter((n) => !n.isRead);
    return items;
  },

  async getUnreadCount(): Promise<number> {
    return notificationsStore.filter((n) => !n.isRead).length;
  },

  async markAsRead(id: string): Promise<void> {
    notificationsStore = notificationsStore.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  },

  async markAllAsRead(): Promise<void> {
    notificationsStore = notificationsStore.map((n) => ({ ...n, isRead: true }));
  },

  async addNotification(newNotif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>): Promise<AppNotification> {
    const created: AppNotification = {
      ...newNotif,
      id: `notif-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    notificationsStore = [created, ...notificationsStore];
    return created;
  },
};
