/**
 * DairyLift Cattle Management Service
 * Asynchronous service interface simulating Phase 2 REST API endpoints
 */

import { CattleAsset, BiologicalStatus, CattleHealthCondition } from '../types/cattle';
import { CATTLE_ASSETS } from '../mockData/cattle';

// In-memory operational store simulating database persistence
let cattleStore: CattleAsset[] = [...CATTLE_ASSETS];

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
    await new Promise((res) => setTimeout(res, 40)); // Simulated network latency
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
    await new Promise((res) => setTimeout(res, 30));
    return cattleStore.find((c) => c.id === id) || null;
  },

  /**
   * Register a new cattle asset into the herd registry
   */
  async register(newCattle: Omit<CattleAsset, 'id'>): Promise<CattleAsset> {
    await new Promise((res) => setTimeout(res, 80));
    
    // Business validation: Ensure unique RFID
    const existing = cattleStore.find((c) => c.rfidTag === newCattle.rfidTag);
    if (existing) {
      throw new Error(`RFID tag ${newCattle.rfidTag} is already assigned to ${existing.name}`);
    }

    const created: CattleAsset = {
      ...newCattle,
      id: `DL-C-${String(cattleStore.length + 1).padStart(3, '0')}`,
    };

    cattleStore = [created, ...cattleStore];
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
    await new Promise((res) => setTimeout(res, 50));
    const index = cattleStore.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Cattle with ID ${id} not found in registry`);
    }

    cattleStore[index] = {
      ...cattleStore[index],
      biologicalStatus: status,
      healthCondition: condition || cattleStore[index].healthCondition,
    };

    return cattleStore[index];
  },

  /**
   * Alias for updating biological status
   */
  async updateBiologicalStatus(id: string, status: BiologicalStatus): Promise<CattleAsset> {
    return this.updateStatus(id, status);
  },
};
