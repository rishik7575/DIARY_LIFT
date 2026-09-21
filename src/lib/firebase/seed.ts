import { db } from './config';
import { doc, getDoc, collection, writeBatch } from 'firebase/firestore';
import { PRODUCTS } from '@/lib/mockData/products';
import { CATTLE_ASSETS } from '@/lib/mockData/cattle';
import { FARM_FACILITY_OVERVIEW, VETERINARY_ALERTS } from '@/lib/mockData/farm';
import { INVESTOR_PROFILES } from '@/lib/mockData/investors';

const INITIAL_SENSOR_ALERTS = [
  {
    id: 'OP-ALT-20260920-001',
    facilityId: 'FAC-NSK-01',
    facilityName: 'Nashik High-Tech Agro-Park Unit A',
    shedId: 'SHED-02',
    shedName: 'Elite A2 Gir Milkers (Shed 2)',
    sensorId: 'SNSR-ENV-NSK-T02',
    sensorType: 'TEMPERATURE',
    metricLabel: 'Ambient Barn Temperature',
    currentValue: 32.4,
    thresholdValue: 30.0,
    unit: '°C',
    severity: 'HIGH',
    status: 'NOTIFIED',
    triggeredAt: '2026-09-20T11:42:00Z',
  },
];

export interface UserProfileRecord {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'investor' | 'consumer';
  avatar: string;
  investorId?: string;
  isUpgradedInvestor?: boolean;
  phoneNumber?: string;
  createdAt: string;
}

export const SEED_USERS: UserProfileRecord[] = [
  {
    uid: 'user-admin-01',
    email: 'admin@dairylift.in',
    name: 'Vikramaditya Singhania',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    uid: 'user-staff-01',
    email: 'rajesh.deshmukh@dairylift.in',
    name: 'Dr. Rajesh Deshmukh, MVSc',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    uid: 'user-investor-01',
    email: 'arjun.mehta@mumbaicapital.com',
    name: 'Arjun Mehta',
    role: 'investor',
    investorId: 'INV-DL-1001',
    isUpgradedInvestor: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    uid: 'user-consumer-01',
    email: 'ananya.sharma@gmail.com',
    name: 'Ananya Sharma',
    role: 'consumer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * Seed initial enterprise collections into Firestore if not yet present
 */
export async function seedInitialFirestoreData(): Promise<void> {
  try {
    const sentinelRef = doc(db, 'system', 'initialized');
    const sentinelSnap = await getDoc(sentinelRef);
    if (sentinelSnap.exists()) {
      return; // Already seeded
    }

    const batch = writeBatch(db);

    // 1. Seed Users
    for (const user of SEED_USERS) {
      const userRef = doc(db, 'users', user.uid);
      batch.set(userRef, user);
      // Index by email for quick lookup
      const emailRef = doc(db, 'user_emails', user.email.toLowerCase());
      batch.set(emailRef, { uid: user.uid, role: user.role, name: user.name });
    }

    // 2. Seed Products
    for (const prod of PRODUCTS) {
      const prodRef = doc(collection(db, 'products'), prod.id);
      batch.set(prodRef, prod);
    }

    // 3. Seed Cattle
    for (const cow of CATTLE_ASSETS) {
      const cattleRef = doc(collection(db, 'cattle'), cow.id);
      batch.set(cattleRef, cow);
    }

    // 4. Seed Facilities
    const facilityRef = doc(db, 'facilities', FARM_FACILITY_OVERVIEW.facilityId);
    batch.set(facilityRef, FARM_FACILITY_OVERVIEW);

    // 5. Seed Alerts
    for (const alert of VETERINARY_ALERTS) {
      const alertRef = doc(collection(db, 'veterinary_alerts'), alert.id);
      batch.set(alertRef, alert);
    }
    for (const alert of INITIAL_SENSOR_ALERTS) {
      const alertRef = doc(collection(db, 'sensor_alerts'), alert.id);
      batch.set(alertRef, alert);
    }

    // 6. Seed Investors
    for (const inv of INVESTOR_PROFILES) {
      const invRef = doc(collection(db, 'investors'), inv.id);
      batch.set(invRef, inv);
    }

    // Mark as initialized
    batch.set(sentinelRef, { initializedAt: new Date().toISOString(), version: '2.0.0' });

    await batch.commit();
    console.info('Successfully seeded enterprise Firestore database.');
  } catch (error) {
    // In demo / fallback mode, log gracefully without throwing
    console.warn('Firestore seeding skipped or completed in local offline store:', error);
  }
}
