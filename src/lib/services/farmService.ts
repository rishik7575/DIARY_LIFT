/**
 * DairyLift Farm Facilities & Infrastructure Service
 */

import { FARM_FACILITY_OVERVIEW } from '../mockData/farm';

export interface FarmFacility {
  id: string;
  name: string;
  location: string;
  establishedYear: number;
  totalAcres: number;
  totalCattleCapacity: number;
  currentCattleHoused: number;
  leadManagerName: string;
  leadVeterinarianName: string;
  fssaiLicenseNumber: string;
  solarCapacityKw: number;
  hydroponicFodderDailyTons: number;
  sheds: {
    shedId: string;
    name: string;
    purpose: string;
    capacity: number;
    occupied: number;
    sensorGatewayId: string;
  }[];
}

export const FACILITIES: FarmFacility[] = [
  {
    id: 'FAC-NSK-01',
    name: 'Nashik High-Tech Agro-Park Unit A',
    location: 'Dindori Agro-Valley, Nashik, Maharashtra 422007',
    establishedYear: 2022,
    totalAcres: 120,
    totalCattleCapacity: 1500,
    currentCattleHoused: 1280,
    leadManagerName: 'Vikram Joshi (VP Operations)',
    leadVeterinarianName: 'Dr. Rajesh Deshmukh, MVSc',
    fssaiLicenseNumber: '10024021000842',
    solarCapacityKw: 250,
    hydroponicFodderDailyTons: 10,
    sheds: [
      { shedId: 'SHED-01', name: 'Maternity & Gestation Barn', purpose: 'Dry & Calving Cows', capacity: 200, occupied: 185, sensorGatewayId: 'GW-MAT-01' },
      { shedId: 'SHED-02', name: 'Elite A2 Gir Milkers', purpose: 'High Yield Lactation', capacity: 350, occupied: 340, sensorGatewayId: 'GW-MILK-02' },
      { shedId: 'SHED-04', name: 'Organic Alfalfa Barn', purpose: 'Lactating A2 Gir Cows', capacity: 350, occupied: 342, sensorGatewayId: 'GW-MILK-04' },
      { shedId: 'SHED-08', name: 'Murrah Buffalo Paddock', purpose: 'High Fat Buffalo Milk', capacity: 400, occupied: 363, sensorGatewayId: 'GW-BUFF-08' },
      { shedId: 'SHED-09', name: 'Veterinary Infirmary', purpose: 'Medical Observation', capacity: 100, occupied: 50, sensorGatewayId: 'GW-VET-09' },
    ],
  },
  {
    id: 'FAC-PUN-02',
    name: 'Pune Valley Organic Pasture Unit B',
    location: 'Baramati Agro-Cluster, Pune, Maharashtra 413133',
    establishedYear: 2024,
    totalAcres: 80,
    totalCattleCapacity: 800,
    currentCattleHoused: 620,
    leadManagerName: 'Sunil Jadhav',
    leadVeterinarianName: 'Dr. Sneha Shinde, BVSc',
    fssaiLicenseNumber: '10024022000918',
    solarCapacityKw: 150,
    hydroponicFodderDailyTons: 6,
    sheds: [
      { shedId: 'SHED-B1', name: 'Gir Cow Pasture Barn', purpose: 'Free-Range Milking', capacity: 400, occupied: 320, sensorGatewayId: 'GW-PUN-01' },
      { shedId: 'SHED-B2', name: 'Young Heifer Development', purpose: 'Growth & Nutrition', capacity: 400, occupied: 300, sensorGatewayId: 'GW-PUN-02' },
    ],
  },
];

export const farmService = {
  /**
   * Get all farm facilities
   */
  async getFacilities(): Promise<FarmFacility[]> {
    await new Promise((res) => setTimeout(res, 30));
    return [...FACILITIES];
  },

  /**
   * Get single facility by ID
   */
  async getFacilityById(id: string): Promise<FarmFacility | null> {
    await new Promise((res) => setTimeout(res, 20));
    return FACILITIES.find((f) => f.id === id) || null;
  },

  /**
   * Get aggregated capacity summary
   */
  async getAggregatedCapacity() {
    await new Promise((res) => setTimeout(res, 25));
    const totalCapacity = FACILITIES.reduce((sum, f) => sum + f.totalCattleCapacity, 0);
    const totalOccupied = FACILITIES.reduce((sum, f) => sum + f.currentCattleHoused, 0);
    const totalFarms = FACILITIES.length;
    const occupancyPercentage = Math.round((totalOccupied / totalCapacity) * 100);

    return {
      totalFarms,
      totalCapacity,
      totalOccupied,
      occupancyPercentage,
      facilityOverview: FARM_FACILITY_OVERVIEW,
    };
  },
};
