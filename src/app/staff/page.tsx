'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  cattleService,
  milkProductionService,
  healthService,
  farmService,
  NewMilkingEntryInput,
  NewHealthReportInput,
} from '@/lib/services';
import { CattleAsset, BiologicalStatus } from '@/lib/types/cattle';
import { DailyMilkLogRecord, VeterinaryAlertFlag, VaccinationScheduleItem, CalfBirthRecord } from '@/lib/types/farm';
import { VACCINATION_SCHEDULE, CALF_BIRTH_RECORDS } from '@/lib/mockData/farm';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatDate } from '@/lib/utils';
import {
  Milk,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  PlusCircle,
  Syringe,
  Baby,
  Stethoscope,
  Filter,
  Check,
  Search,
  ShieldCheck,
  Calendar,
  Layers,
  Thermometer,
} from 'lucide-react';

export default function StaffPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('milking');
  const [cattleList, setCattleList] = useState<CattleAsset[]>([]);
  const [milkLogs, setMilkLogs] = useState<DailyMilkLogRecord[]>([]);
  const [alerts, setAlerts] = useState<VeterinaryAlertFlag[]>([]);
  const [vaccinations] = useState<VaccinationScheduleItem[]>(VACCINATION_SCHEDULE);
  const [calves] = useState<CalfBirthRecord[]>(CALF_BIRTH_RECORDS);
  const [loading, setLoading] = useState(true);

  // Notifications / feedback
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Milking Form state
  const [milkingForm, setMilkingForm] = useState<{
    cattleId: string;
    session: 'AM' | 'PM';
    yieldLiters: string;
    fatPercentage: string;
    snfPercentage: string;
    notes: string;
  }>({
    cattleId: '',
    session: 'AM',
    yieldLiters: '14.5',
    fatPercentage: '4.6',
    snfPercentage: '8.9',
    notes: '',
  });

  // Health report modal state
  const [healthModalOpen, setHealthModalOpen] = useState(false);
  const [healthForm, setHealthForm] = useState<{
    cattleId: string;
    diagnosis: string;
    treatmentNotes: string;
    followUpDate: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  }>({
    cattleId: '',
    diagnosis: '',
    treatmentNotes: '',
    followUpDate: '2026-09-28',
    severity: 'HIGH',
  });

  // Search & filter state
  const [cattleSearch, setCattleSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function loadStaffData() {
      try {
        const [c, m, a] = await Promise.all([
          cattleService.getAll(),
          milkProductionService.getDailyLogs('2026-09-20'),
          healthService.getAlerts(),
        ]);
        setCattleList(c);
        setMilkLogs(m);
        setAlerts(a);
        if (c.length > 0 && !milkingForm.cattleId) {
          setMilkingForm((prev) => ({ ...prev, cattleId: c[0].id }));
          setHealthForm((prev) => ({ ...prev, cattleId: c[0].id }));
        }
      } catch (err) {
        console.error('Failed to load farm operations data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStaffData();
  }, []);

  const showFeedback = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      setSuccessBanner(msg);
      setTimeout(() => setSuccessBanner(null), 4000);
    }
  };

  // Submit Milking Log
  const handleMilkingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cattle = cattleList.find((c) => c.id === milkingForm.cattleId);
    if (!cattle) {
      showFeedback('Please select a valid cattle asset.', true);
      return;
    }

    const yieldNum = parseFloat(milkingForm.yieldLiters);
    const fatNum = parseFloat(milkingForm.fatPercentage);
    const snfNum = parseFloat(milkingForm.snfPercentage);

    if (isNaN(yieldNum) || yieldNum <= 0 || yieldNum > 35) {
      showFeedback('Milk yield must be between 0.5L and 35.0L for a single parlour session.', true);
      return;
    }

    try {
      const input: NewMilkingEntryInput = {
        date: '2026-09-20',
        cattleId: cattle.id,
        session: milkingForm.session,
        yieldLiters: yieldNum,
        fatPercentage: isNaN(fatNum) ? 4.2 : fatNum,
        snfPercentage: isNaN(snfNum) ? 8.5 : snfNum,
        operatorEmployeeId: user?.id || 'EMP-OPS-04',
        notes: milkingForm.notes || undefined,
      };

      const updatedRecord = await milkProductionService.logMilking(input, {
        name: cattle.name,
        rfidTag: cattle.rfidTag,
        investorId: cattle.assignedInvestorId,
      });

      // Update local state
      setMilkLogs((prev) => {
        const idx = prev.findIndex((log) => log.cattleId === cattle.id && log.date === updatedRecord.date);
        if (idx !== -1) {
          const clone = [...prev];
          clone[idx] = updatedRecord;
          return clone;
        }
        return [updatedRecord, ...prev];
      });

      showFeedback(
        `Successfully logged ${yieldNum}L (${milkingForm.session}) for ${cattle.name} [${cattle.rfidTag}]. Quality: ${updatedRecord.quality.microbialQualityGrade}`
      );
      setMilkingForm((prev) => ({ ...prev, notes: '' }));
    } catch (err: any) {
      showFeedback(err.message || 'Failed to record milking session.', true);
    }
  };

  // Acknowledge Health Alert
  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      const updated = await healthService.acknowledgeAlert(alertId, 'Field veterinary inspection performed by shift manager.');
      setAlerts((prev) => prev.map((a) => (a.id === alertId ? updated : a)));
      showFeedback(`Alert ${alertId} resolved and treatment protocol logged.`);
    } catch (err: any) {
      showFeedback(err.message || 'Failed to acknowledge alert.', true);
    }
  };

  // Submit Veterinary Report
  const handleHealthReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cattle = cattleList.find((c) => c.id === healthForm.cattleId);
    if (!cattle) return;

    try {
      const input: NewHealthReportInput = {
        cattleId: cattle.id,
        rfidTag: cattle.rfidTag,
        cattleName: cattle.name,
        assignedInvestorId: cattle.assignedInvestorId,
        diagnosis: healthForm.diagnosis,
        treatmentNotes: healthForm.treatmentNotes,
        followUpDate: healthForm.followUpDate,
        severity: healthForm.severity,
        veterinarianName: user?.name || 'Dr. Hemant Kulkarni, MVSc',
      };

      const newAlert = await healthService.createHealthReport(input);
      setAlerts((prev) => [newAlert, ...prev]);
      setHealthModalOpen(false);
      setHealthForm({
        cattleId: cattleList[0]?.id || '',
        diagnosis: '',
        treatmentNotes: '',
        followUpDate: '2026-09-28',
        severity: 'HIGH',
      });
      showFeedback(`Clinical examination filed for ${cattle.name}. Alert ALT-${newAlert.id} tracked.`);
    } catch (err: any) {
      showFeedback(err.message || 'Failed to create veterinary report.', true);
    }
  };

  // Change Cattle Biological Status
  const handleBiologicalStatusChange = async (cattleId: string, newStatus: BiologicalStatus) => {
    try {
      const updated = await cattleService.updateBiologicalStatus(cattleId, newStatus);
      setCattleList((prev) => prev.map((c) => (c.id === cattleId ? updated : c)));
      showFeedback(`Updated ${updated.name} status to "${newStatus.toUpperCase()}".`);
    } catch (err: any) {
      showFeedback(err.message || 'Failed to update biological status.', true);
    }
  };

  // Summary Metrics
  const todayTotalLiters = milkLogs.reduce((acc, log) => acc + log.totalDailyYieldLiters, 0);
  const gradeAPlusCount = milkLogs.filter((log) => log.quality.microbialQualityGrade === 'Grade-A+').length;
  const activeAlertsCount = alerts.filter((a) => a.status !== 'RESOLVED').length;
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;

  const filteredCattle = cattleList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.rfidTag.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(cattleSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.biologicalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PortalGuard allowedRoles={['staff', 'admin']}>
      <PortalLayout allowedRoles={['staff', 'admin']}>
        {/* Page Executive Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 tracking-tight">
                Farm Operations ERP
              </h1>
              <Badge variant="outline" className="border-forest-600/30 text-forest-700 bg-forest-50 font-medium">
                Shed Parlour Shift Active
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Field Telemetry, Automated Milking Parlour Logging, and Veterinary Biometric Health Suite.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHealthModalOpen(true)}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Stethoscope className="w-4 h-4 mr-2 text-forest-700" />
              File Vet Exam
            </Button>
            <Button
              variant="forest"
              size="sm"
              onClick={() => setActiveTab('milking')}
              className="bg-forest-700 hover:bg-forest-800 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Log Milking Session
            </Button>
          </div>
        </div>

        {/* Action Alert Banner */}
        {successBanner && (
          <div className="mt-4 p-4 rounded-lg bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0" />
              <span className="text-sm font-medium">{successBanner}</span>
            </div>
            <button
              onClick={() => setSuccessBanner(null)}
              className="text-forest-600 hover:text-forest-900 text-xs font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-900 text-xs font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Operational KPI Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Parlour Yield</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{todayTotalLiters.toFixed(1)} L</span>
                  <span className="text-xs text-forest-700 font-medium">AM + PM</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Target: 320.0 L/day</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                <Milk className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade-A+ Quality Ratio</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">
                    {milkLogs.length > 0 ? Math.round((gradeAPlusCount / milkLogs.length) * 100) : 0}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">({gradeAPlusCount} batches)</span>
                </div>
                <p className="text-xs text-forest-700 font-medium mt-1">Direct Commerce Grade</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Vet/IoT Alerts</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{activeAlertsCount}</span>
                  {criticalCount > 0 && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      {criticalCount} Critical
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">Collar Biometrics & Flags</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700">
                <Activity className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Herd Size</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{cattleList.length}</span>
                  <span className="text-xs text-slate-500 font-medium">Registered RFID</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">3 Production Sheds</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <Layers className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabbed Operations Interface */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-slate-200/80 p-1 rounded-lg">
              <TabsTrigger value="milking" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Milk className="w-4 h-4 mr-2" />
                Parlour Milking Logs
              </TabsTrigger>
              <TabsTrigger value="health" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Activity className="w-4 h-4 mr-2" />
                Veterinary & IoT Alerts ({activeAlertsCount})
              </TabsTrigger>
              <TabsTrigger value="herd" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Layers className="w-4 h-4 mr-2" />
                Herd & Biological Status
              </TabsTrigger>
              <TabsTrigger value="records" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Vaccines & Calves
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: MILKING PARLOUR LOGGING */}
            <TabsContent value="milking" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Milking Session Submission Form */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-1">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Milk className="w-5 h-5 text-forest-700" />
                      Record Milking Batch
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Automated meter entry with composite quality scoring.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleMilkingSubmit} className="space-y-4">
                      <div>
                        <Label className="text-xs font-semibold text-slate-700">Select Cattle</Label>
                        <select
                          value={milkingForm.cattleId}
                          onChange={(e) => setMilkingForm({ ...milkingForm, cattleId: e.target.value })}
                          className="w-full mt-1.5 h-10 px-3 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                          required
                        >
                          {cattleList.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.rfidTag}) - {c.breed} [{c.biologicalStatus}]
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-semibold text-slate-700">Session</Label>
                          <select
                            value={milkingForm.session}
                            onChange={(e) => setMilkingForm({ ...milkingForm, session: e.target.value as 'AM' | 'PM' })}
                            className="w-full mt-1.5 h-10 px-3 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                          >
                            <option value="AM">Morning (AM)</option>
                            <option value="PM">Evening (PM)</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold text-slate-700">Yield (Liters)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={milkingForm.yieldLiters}
                            onChange={(e) => setMilkingForm({ ...milkingForm, yieldLiters: e.target.value })}
                            className="mt-1.5 h-10 border-slate-300 focus:ring-forest-600"
                            placeholder="e.g. 14.5"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-semibold text-slate-700">Fat %</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={milkingForm.fatPercentage}
                            onChange={(e) => setMilkingForm({ ...milkingForm, fatPercentage: e.target.value })}
                            className="mt-1.5 h-10 border-slate-300 focus:ring-forest-600"
                            placeholder="4.6"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-semibold text-slate-700">SNF %</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={milkingForm.snfPercentage}
                            onChange={(e) => setMilkingForm({ ...milkingForm, snfPercentage: e.target.value })}
                            className="mt-1.5 h-10 border-slate-300 focus:ring-forest-600"
                            placeholder="8.9"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs font-semibold text-slate-700">Session Observations / Notes</Label>
                        <Input
                          type="text"
                          value={milkingForm.notes}
                          onChange={(e) => setMilkingForm({ ...milkingForm, notes: e.target.value })}
                          className="mt-1.5 h-10 border-slate-300 focus:ring-forest-600"
                          placeholder="e.g. Normal flow, parlour cluster cleaned"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="forest"
                        className="w-full bg-forest-700 hover:bg-forest-800 text-white font-medium py-2.5 mt-2"
                      >
                        Submit & Validate Parlour Entry
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Daily Parlour Table */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
                  <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">
                        Today's Milking Logs (2026-09-20)
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Certified AM/PM yields with lab-calibrated composite indices.
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-slate-200 text-slate-600">
                      {milkLogs.length} Records
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                          <TableRow>
                            <TableHead className="font-semibold text-slate-700">Cattle Asset</TableHead>
                            <TableHead className="font-semibold text-slate-700">AM Yield</TableHead>
                            <TableHead className="font-semibold text-slate-700">PM Yield</TableHead>
                            <TableHead className="font-semibold text-slate-700">Total (L)</TableHead>
                            <TableHead className="font-semibold text-slate-700">Quality Grade</TableHead>
                            <TableHead className="font-semibold text-slate-700">Fat / SNF</TableHead>
                            <TableHead className="font-semibold text-slate-700">Fulfillment</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {milkLogs.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                                No milking sessions recorded for this date yet.
                              </TableCell>
                            </TableRow>
                          ) : (
                            milkLogs.map((log) => (
                              <TableRow key={log.id} className="hover:bg-slate-50/80">
                                <TableCell>
                                  <div className="font-medium text-slate-900">{log.cattleName}</div>
                                  <div className="text-xs text-slate-500 font-mono">{log.rfidTag}</div>
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                  {log.amYieldLiters > 0 ? `${log.amYieldLiters.toFixed(1)} L` : '—'}
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                  {log.pmYieldLiters > 0 ? `${log.pmYieldLiters.toFixed(1)} L` : '—'}
                                </TableCell>
                                <TableCell className="font-mono font-bold text-slate-900">
                                  {log.totalDailyYieldLiters.toFixed(1)} L
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      log.quality.microbialQualityGrade === 'Grade-A+'
                                        ? 'bg-forest-100 text-forest-800 border-forest-200'
                                        : 'bg-amber-100 text-amber-800 border-amber-200'
                                    }
                                  >
                                    {log.quality.microbialQualityGrade}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-slate-600 font-mono">
                                  {log.quality.fatPercentage}% / {log.quality.snfPercentage}%
                                </TableCell>
                                <TableCell>
                                  <span className="text-xs font-semibold text-slate-700">
                                    {log.batchApproval === 'APPROVED_PREMIUM_COMMERCE' ? 'Consumer Milk' : 'Bulk Processing'}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* TAB 2: VETERINARY & IOT ALERTS */}
            <TabsContent value="health" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {alerts.map((alert) => {
                  const isResolved = alert.status === 'RESOLVED';
                  const isCritical = alert.severity === 'CRITICAL';
                  const isHigh = alert.severity === 'HIGH';

                  return (
                    <Card
                      key={alert.id}
                      className={`border ${
                        isResolved
                          ? 'border-slate-200 bg-white opacity-75'
                          : isCritical
                          ? 'border-red-300 bg-red-50/40 shadow-sm'
                          : isHigh
                          ? 'border-amber-300 bg-amber-50/40 shadow-sm'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              className={
                                isCritical
                                  ? 'bg-red-600 text-white'
                                  : isHigh
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-slate-700 text-white'
                              }
                            >
                              {alert.severity}
                            </Badge>
                            <span className="font-bold text-slate-900">{alert.headline}</span>
                            <span className="text-xs text-slate-500 font-mono">[{alert.id}]</span>
                          </div>

                          <p className="text-sm text-slate-700">{alert.detailedDiagnosis}</p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                            <span className="flex items-center gap-1 font-medium">
                              <Thermometer className="w-3.5 h-3.5 text-slate-500" />
                              Telemetry: {alert.telemetrySnapshot.metricName} = {alert.telemetrySnapshot.recordedValue}
                            </span>
                            <span>Target Range: {alert.telemetrySnapshot.referenceRange}</span>
                            <span>Assigned Vet: {alert.assignedVeterinarian}</span>
                            <span>Asset: {alert.cattleName} ({alert.rfidTag})</span>
                          </div>

                          {alert.treatmentProtocolPrescribed && (
                            <div className="text-xs bg-white/80 p-2.5 rounded border border-slate-200 text-slate-700">
                              <span className="font-semibold text-slate-800">Protocol:</span>{' '}
                              {alert.treatmentProtocolPrescribed}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                          {isResolved ? (
                            <Badge variant="outline" className="border-forest-600 text-forest-700 bg-forest-50 py-1 px-3">
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Resolved
                            </Badge>
                          ) : (
                            <Button
                              variant="forest"
                              size="sm"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                              className="bg-forest-700 hover:bg-forest-800 text-white"
                            >
                              Acknowledge & Treat
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* TAB 3: HERD & BIOLOGICAL STATUS */}
            <TabsContent value="herd" className="space-y-6">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Herd Census & Biological State Transition
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Inspect individual cattle and update lifecycle status (lactating, dry, gestating, calved).
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search name, RFID..."
                        value={cattleSearch}
                        onChange={(e) => setCattleSearch(e.target.value)}
                        className="pl-9 h-10 w-48 md:w-64 border-slate-300"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Milking">Milking</option>
                      <option value="Dry">Dry</option>
                      <option value="Medical Observation">Medical Observation</option>
                      <option value="Transition / Calving">Transition / Calving</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow>
                          <TableHead className="font-semibold text-slate-700">Cattle Identification</TableHead>
                          <TableHead className="font-semibold text-slate-700">Breed</TableHead>
                          <TableHead className="font-semibold text-slate-700">Facility / Shed</TableHead>
                          <TableHead className="font-semibold text-slate-700">Current Biological Status</TableHead>
                          <TableHead className="font-semibold text-slate-700">Lactation No.</TableHead>
                          <TableHead className="font-semibold text-slate-700">Daily Avg</TableHead>
                          <TableHead className="font-semibold text-slate-700">Status Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCattle.map((c) => (
                          <TableRow key={c.id} className="hover:bg-slate-50/80">
                            <TableCell>
                              <div className="font-bold text-slate-900">{c.name}</div>
                              <div className="text-xs text-slate-500 font-mono">{c.rfidTag}</div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-700">{c.breed.replace(/_/g, ' ')}</TableCell>
                            <TableCell className="text-sm text-slate-700">
                              {c.farmAllocation?.facilityId || 'FAC-01'} ({c.farmAllocation?.shedNumber || 'Shed 1'})
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  c.biologicalStatus === 'Milking'
                                    ? 'border-forest-600 bg-forest-50 text-forest-700'
                                    : c.biologicalStatus === 'Dry'
                                    ? 'border-amber-600 bg-amber-50 text-amber-700'
                                    : 'border-slate-400 bg-slate-100 text-slate-700'
                                }
                              >
                                {c.biologicalStatus.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{c.lactation?.lactationNumber || 1}</TableCell>
                            <TableCell className="font-mono text-sm font-semibold text-slate-900">
                              {c.telemetry?.dailyAverageYieldLiters || 14.5} L/day
                            </TableCell>
                            <TableCell>
                              <select
                                value={c.biologicalStatus}
                                onChange={(e) => handleBiologicalStatusChange(c.id, e.target.value as BiologicalStatus)}
                                className="text-xs h-8 px-2 border border-slate-300 rounded bg-white font-medium text-slate-800"
                              >
                                <option value="Milking">Milking</option>
                                <option value="Dry">Dry</option>
                                <option value="Medical Observation">Medical Observation</option>
                                <option value="Transition / Calving">Transition / Calving</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: VACCINATIONS & CALVES */}
            <TabsContent value="records" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Vaccination Schedule */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Syringe className="w-5 h-5 text-forest-700" />
                      Prophylactic Vaccination Protocols
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      National Dairy Herd Immunization Registry.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                          <TableRow>
                            <TableHead className="font-semibold text-slate-700">Vaccine / Disease</TableHead>
                            <TableHead className="font-semibold text-slate-700">Due Date</TableHead>
                            <TableHead className="font-semibold text-slate-700">Batch Code</TableHead>
                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vaccinations.map((vac) => (
                            <TableRow key={vac.id}>
                              <TableCell>
                                <div className="font-medium text-slate-900">{vac.disease}</div>
                                <div className="text-xs text-slate-500">{vac.vaccineName}</div>
                              </TableCell>
                              <TableCell className="text-xs text-slate-600 font-mono">
                                {formatDate(vac.scheduledDate)}
                              </TableCell>
                              <TableCell className="text-xs text-slate-600 font-mono">{vac.batchNumber}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    vac.status === 'completed'
                                      ? 'bg-forest-100 text-forest-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }
                                >
                                  {vac.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Calf Birth Registry */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Baby className="w-5 h-5 text-amber-700" />
                      Calf Birth & Lineage Records
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Pedigree documentation and birth weights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                          <TableRow>
                            <TableHead className="font-semibold text-slate-700">Calf Tag / Name</TableHead>
                            <TableHead className="font-semibold text-slate-700">Dam (Mother)</TableHead>
                            <TableHead className="font-semibold text-slate-700">Gender & Weight</TableHead>
                            <TableHead className="font-semibold text-slate-700">Birth Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {calves.map((calf) => (
                            <TableRow key={calf.id}>
                              <TableCell>
                                <div className="font-medium text-slate-900">{calf.name || 'Unnamed Calf'}</div>
                                <div className="text-xs text-slate-500 font-mono">{calf.calfId}</div>
                              </TableCell>
                              <TableCell className="text-xs text-slate-700 font-medium">
                                {calf.motherName} ({calf.motherCattleId})
                              </TableCell>
                              <TableCell className="text-xs text-slate-600">
                                {calf.gender.toUpperCase()} • {calf.birthWeightKg} kg
                              </TableCell>
                              <TableCell className="text-xs text-slate-600 font-mono">
                                {formatDate(calf.dateOfBirth)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Clinical Examination Modal Dialog */}
        <Dialog open={healthModalOpen} onOpenChange={setHealthModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-forest-700" />
                File Veterinary Clinical Exam
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Log diagnosis and prescribe treatment protocols for cattle biometric health tracking.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleHealthReportSubmit} className="space-y-4 mt-2">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Target Cattle</Label>
                <select
                  value={healthForm.cattleId}
                  onChange={(e) => setHealthForm({ ...healthForm, cattleId: e.target.value })}
                  className="w-full mt-1.5 h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                  required
                >
                  {cattleList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.rfidTag})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Severity Tier</Label>
                <select
                  value={healthForm.severity}
                  onChange={(e) => setHealthForm({ ...healthForm, severity: e.target.value as any })}
                  className="w-full mt-1.5 h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                >
                  <option value="CRITICAL">CRITICAL (Immediate Isolation)</option>
                  <option value="HIGH">HIGH (Veterinary Intervention)</option>
                  <option value="MEDIUM">MEDIUM (Observation Required)</option>
                  <option value="INFO">INFO (Routine Checkup Pass)</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Clinical Diagnosis</Label>
                <Input
                  type="text"
                  value={healthForm.diagnosis}
                  onChange={(e) => setHealthForm({ ...healthForm, diagnosis: e.target.value })}
                  placeholder="e.g. Subclinical mastitis in rear right quarter"
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Prescribed Treatment & Protocol</Label>
                <Input
                  type="text"
                  value={healthForm.treatmentNotes}
                  onChange={(e) => setHealthForm({ ...healthForm, treatmentNotes: e.target.value })}
                  placeholder="e.g. Intramammary infusion + NSAID, milk separated"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Follow-up Inspection Date</Label>
                <Input
                  type="date"
                  value={healthForm.followUpDate}
                  onChange={(e) => setHealthForm({ ...healthForm, followUpDate: e.target.value })}
                  className="mt-1.5"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setHealthModalOpen(false)}
                  className="border-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="forest"
                  size="sm"
                  className="bg-forest-700 hover:bg-forest-800 text-white"
                >
                  Save Exam Report
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

      </PortalLayout>
    </PortalGuard>
  );
}
