/**
 * DairyLift Farm Facilities & Operational Infrastructure Service
 * Handles multi-facility shed capacity, environmental IoT sensor alerting, and staff mitigation workflows.
 */

import { FARM_FACILITY_OVERVIEW } from '../mockData/farm';
import { EnvironmentalSensorAlert, FarmFacilityThresholdConfig, SensorType } from '../types/farm';

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
    ambientTempCelsius: number;
    humidityPercent: number;
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
      { shedId: 'SHED-01', name: 'Maternity & Gestation Barn', purpose: 'Dry & Calving Cows', capacity: 200, occupied: 185, sensorGatewayId: 'GW-MAT-01', ambientTempCelsius: 28.2, humidityPercent: 62 },
      { shedId: 'SHED-02', name: 'Elite A2 Gir Milkers', purpose: 'High Yield Lactation', capacity: 350, occupied: 340, sensorGatewayId: 'GW-MILK-02', ambientTempCelsius: 32.4, humidityPercent: 71 },
      { shedId: 'SHED-04', name: 'Organic Alfalfa Barn', purpose: 'Lactating A2 Gir Cows', capacity: 350, occupied: 342, sensorGatewayId: 'GW-MILK-04', ambientTempCelsius: 27.8, humidityPercent: 58 },
      { shedId: 'SHED-08', name: 'Murrah Buffalo Paddock', purpose: 'High Fat Buffalo Milk', capacity: 400, occupied: 363, sensorGatewayId: 'GW-BUFF-08', ambientTempCelsius: 29.1, humidityPercent: 64 },
      { shedId: 'SHED-09', name: 'Veterinary Infirmary', purpose: 'Medical Observation', capacity: 100, occupied: 50, sensorGatewayId: 'GW-VET-09', ambientTempCelsius: 26.5, humidityPercent: 55 },
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
      { shedId: 'SHED-B1', name: 'Gir Cow Pasture Barn', purpose: 'Free-Range Milking', capacity: 400, occupied: 320, sensorGatewayId: 'GW-PUN-01', ambientTempCelsius: 27.4, humidityPercent: 60 },
      { shedId: 'SHED-B2', name: 'Young Heifer Development', purpose: 'Growth & Nutrition', capacity: 400, occupied: 300, sensorGatewayId: 'GW-PUN-02', ambientTempCelsius: 28.0, humidityPercent: 62 },
    ],
  },
];

// Initial thresholds store
const facilityThresholdsStore: Record<string, FarmFacilityThresholdConfig> = {
  'FAC-NSK-01': {
    facilityId: 'FAC-NSK-01',
    facilityName: 'Nashik High-Tech Agro-Park Unit A',
    maxTemperatureCelsius: 30.0,
    maxHumidityPercent: 75,
    minWaterFlowLpm: 45,
    chillerMaxTempCelsius: 4.0,
    emergencyMistingActive: true,
    ventilationFanSpeedPercent: 85,
    lastUpdated: '2026-09-20T10:00:00Z',
  },
  'FAC-PUN-02': {
    facilityId: 'FAC-PUN-02',
    facilityName: 'Pune Valley Organic Pasture Unit B',
    maxTemperatureCelsius: 30.0,
    maxHumidityPercent: 75,
    minWaterFlowLpm: 40,
    chillerMaxTempCelsius: 4.0,
    emergencyMistingActive: false,
    ventilationFanSpeedPercent: 60,
    lastUpdated: '2026-09-20T10:00:00Z',
  },
};

// Initial operational alerts (contains the Farm A 32.4°C temperature alert exceeding 30.0°C)
let operationalAlertsStore: EnvironmentalSensorAlert[] = [
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

export const farmService = {
  /**
   * Get all farm facilities
   */
  async getFacilities(): Promise<FarmFacility[]> {
    await new Promise((res) => setTimeout(res, 25));
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
    await new Promise((res) => setTimeout(res, 20));
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

  /**
   * Get all active environmental and operational alerts
   */
  async getOperationalAlerts(filter?: { status?: string }): Promise<EnvironmentalSensorAlert[]> {
    await new Promise((res) => setTimeout(res, 25));
    if (!filter?.status || filter.status === 'all') return [...operationalAlertsStore];
    return operationalAlertsStore.filter((a) => a.status === filter.status);
  },

  /**
   * Get unacknowledged alerts count (for notification bell)
   */
  async getUnresolvedAlertCount(): Promise<number> {
    return operationalAlertsStore.filter((a) => a.status !== 'RESOLVED').length;
  },

  /**
   * Staff records mitigation action & resolves the alert
   * Completes workflow: Notification -> Staff Action -> Resolution
   */
  async acknowledgeAndMitigateAlert(
    alertId: string,
    actionNotes: string,
    staffName: string
  ): Promise<EnvironmentalSensorAlert> {
    await new Promise((res) => setTimeout(res, 60));
    const idx = operationalAlertsStore.findIndex((a) => a.id === alertId);
    if (idx === -1) throw new Error(`Operational alert ${alertId} not found`);

    const now = new Date().toISOString();
    const updated: EnvironmentalSensorAlert = {
      ...operationalAlertsStore[idx],
      status: 'RESOLVED',
      acknowledgedAt: now,
      acknowledgedBy: staffName,
      resolvedAt: now,
      mitigationActionTaken: actionNotes,
    };

    operationalAlertsStore[idx] = updated;

    // If it was the temperature alert on Shed 2, normalize ambient temp in facility
    const facility = FACILITIES.find((f) => f.id === updated.facilityId);
    const shed = facility?.sheds.find((s) => s.shedId === updated.shedId);
    if (shed && updated.sensorType === 'TEMPERATURE') {
      shed.ambientTempCelsius = 28.5; // Back within safe threshold
    }

    return updated;
  },

  /**
   * Get threshold configurations for a facility
   */
  async getFacilityThresholds(facilityId: string): Promise<FarmFacilityThresholdConfig> {
    await new Promise((res) => setTimeout(res, 20));
    return facilityThresholdsStore[facilityId] || facilityThresholdsStore['FAC-NSK-01'];
  },

  /**
   * Update facility environmental thresholds (Admin control)
   */
  async updateFacilityThresholds(
    facilityId: string,
    newConfig: Partial<FarmFacilityThresholdConfig>
  ): Promise<FarmFacilityThresholdConfig> {
    await new Promise((res) => setTimeout(res, 50));
    const existing = facilityThresholdsStore[facilityId] || facilityThresholdsStore['FAC-NSK-01'];
    const updated: FarmFacilityThresholdConfig = {
      ...existing,
      ...newConfig,
      lastUpdated: new Date().toISOString(),
    };
    facilityThresholdsStore[facilityId] = updated;
    return updated;
  },

  /**
   * Simulate a live sensor spike (Triggering the alert workflow)
   */
  async simulateSensorReading(
    facilityId: string,
    shedId: string,
    sensorType: SensorType,
    readingValue: number
  ): Promise<EnvironmentalSensorAlert | null> {
    await new Promise((res) => setTimeout(res, 40));
    const config = facilityThresholdsStore[facilityId] || facilityThresholdsStore['FAC-NSK-01'];
    const facility = FACILITIES.find((f) => f.id === facilityId) || FACILITIES[0];
    const shed = facility.sheds.find((s) => s.shedId === shedId) || facility.sheds[1];

    let threshold = config.maxTemperatureCelsius;
    let unit = '°C';
    let label = 'Ambient Barn Temperature';

    if (sensorType === 'HUMIDITY') {
      threshold = config.maxHumidityPercent;
      unit = '%';
      label = 'Relative Humidity';
    } else if (sensorType === 'CHILLER_TEMP') {
      threshold = config.chillerMaxTempCelsius;
      unit = '°C';
      label = 'Milk Chiller Vat Temp';
    }

    if (readingValue > threshold) {
      const newAlert: EnvironmentalSensorAlert = {
        id: `OP-ALT-${Date.now().toString().slice(-6)}`,
        facilityId: facility.id,
        facilityName: facility.name,
        shedId: shed.shedId,
        shedName: `${shed.name} (${shed.shedId})`,
        sensorId: `SNSR-${facility.id.slice(4, 7)}-${sensorType.slice(0, 3)}`,
        sensorType,
        metricLabel: label,
        currentValue: readingValue,
        thresholdValue: threshold,
        unit,
        severity: readingValue > threshold + 3 ? 'CRITICAL' : 'HIGH',
        status: 'NOTIFIED',
        triggeredAt: new Date().toISOString(),
      };

      operationalAlertsStore = [newAlert, ...operationalAlertsStore];
      return newAlert;
    }

    return null;
  },
};
