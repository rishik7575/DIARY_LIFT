/**
 * DairyLift Cattle Management Service
 * Multi-layer persistence: Cloud Firestore with synchronized local client cache
 */

import { CattleAsset, BiologicalStatus, CattleHealthCondition } from '../types/cattle';
import { CATTLE_ASSETS } from '../mockData/cattle';
import { db, isLiveFirebaseConfigured } from '../firebase/config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { broadcastRealtimeEvent } from '../realtime/useRealtimeSync';

function loadInitialCattle(): CattleAsset[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dairylift_cattle_registry');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }
  return [...CATTLE_ASSETS];
}

let cattleStore: CattleAsset[] = loadInitialCattle();

function saveCattleStore(list: CattleAsset[]) {
  cattleStore = list;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('dairylift_cattle_registry', JSON.stringify(list));
    } catch {
      // ignore
    }
  }
}

export const cattleService = {
  /**
   * Retrieve all cattle assets with optional filtering
   */
  async getAll(filter?: {
    breed?: string;
    status?: string;
    search?: string;
    investorId?: string;
  }): Promise<CattleAsset[]> {
    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'cattle'));
        if (!snap.empty) {
          const remoteList = snap.docs.map((d) => d.data() as CattleAsset);
          saveCattleStore(remoteList);
        }
      } catch (err) {
        console.warn('Firestore cattle fetch error, using database cache:', err);
      }
    }

    await new Promise((res) => setTimeout(res, 30));
    let results = [...cattleStore];

    if (filter?.breed && filter.breed !== 'all') {
      results = results.filter((c) => c.breed === filter.breed);
    }
    if (filter?.status && filter.status !== 'all') {
      results = results.filter((c) => c.biologicalStatus === filter.status);
    }
    if (filter?.investorId) {
      results = results.filter((c) => c.assignedInvestorId === filter.investorId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.rfidTag.toLowerCase().includes(q) ||
          c.earTagNumber.toLowerCase().includes(q)
      );
    }
    return results;
  },

  /**
   * Retrieve single cattle record by ID
   */
  async getById(id: string): Promise<CattleAsset | null> {
    const local = cattleStore.find((c) => c.id === id);
    if (local) return local;

    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'cattle'));
        const found = snap.docs.find((d) => d.id === id);
        if (found) return found.data() as CattleAsset;
      } catch (err) {
        console.warn('Firestore cattle getById error:', err);
      }
    }
    return null;
  },

  /**
   * Register a new cattle asset into the herd registry
   */
  async register(newCattle: Omit<CattleAsset, 'id'>): Promise<CattleAsset> {
    await new Promise((res) => setTimeout(res, 60));

    const existing = cattleStore.find((c) => c.rfidTag === newCattle.rfidTag);
    if (existing) {
      throw new Error(`RFID tag ${newCattle.rfidTag} is already assigned to ${existing.name}`);
    }

    const created: CattleAsset = {
      ...newCattle,
      id: `DL-C-${String(cattleStore.length + 1).padStart(3, '0')}`,
    };

    const updatedList = [created, ...cattleStore];
    saveCattleStore(updatedList);
    broadcastRealtimeEvent('CATTLE_UPDATED', created);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'cattle', created.id), created);
      } catch (err) {
        console.warn('Firestore cattle register error:', err);
      }
    }

    return created;
  },

  /**
   * Update biological status & veterinary condition
   */
  async updateStatus(
    id: string,
    status: BiologicalStatus,
    condition?: CattleHealthCondition
  ): Promise<CattleAsset> {
    await new Promise((res) => setTimeout(res, 40));
    const index = cattleStore.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Cattle with ID ${id} not found in registry`);
    }

    const updatedRecord: CattleAsset = {
      ...cattleStore[index],
      biologicalStatus: status,
      healthCondition: condition || cattleStore[index].healthCondition,
    };

    const updatedList = [...cattleStore];
    updatedList[index] = updatedRecord;
    saveCattleStore(updatedList);
    broadcastRealtimeEvent('CATTLE_UPDATED', updatedRecord);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'cattle', id), updatedRecord, { merge: true });
      } catch (err) {
        console.warn('Firestore updateStatus error:', err);
      }
    }

    return updatedRecord;
  },

  /**
   * Alias for updating biological status
   */
  async updateBiologicalStatus(id: string, status: BiologicalStatus): Promise<CattleAsset> {
    return this.updateStatus(id, status);
  },
};
