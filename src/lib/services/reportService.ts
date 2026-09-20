/**
 * DairyLift Aggregation & Executive Reporting Service
 * Prepares formatted timeseries data for Recharts across Admin and Investor dashboards
 */

export const reportService = {
  /**
   * Platform revenue & operational expense trend data (Recharts)
   */
  async getExecutiveFinancialTrends() {
    await new Promise((res) => setTimeout(res, 40));
    return [
      { month: 'May 2026', revenueLakhs: 42.4, expensesLakhs: 28.1, milkSalesLakhs: 26.2, dividendDisbursedLakhs: 7.2 },
      { month: 'Jun 2026', revenueLakhs: 48.6, expensesLakhs: 31.0, milkSalesLakhs: 30.5, dividendDisbursedLakhs: 7.8 },
      { month: 'Jul 2026', revenueLakhs: 54.2, expensesLakhs: 33.4, milkSalesLakhs: 34.8, dividendDisbursedLakhs: 8.4 },
      { month: 'Aug 2026', revenueLakhs: 61.8, expensesLakhs: 36.2, milkSalesLakhs: 39.4, dividendDisbursedLakhs: 9.1 },
      { month: 'Sep 2026', revenueLakhs: 68.5, expensesLakhs: 38.9, milkSalesLakhs: 44.1, dividendDisbursedLakhs: 9.7 },
      { month: 'Oct 2026 (Proj)', revenueLakhs: 75.0, expensesLakhs: 41.2, milkSalesLakhs: 49.0, dividendDisbursedLakhs: 10.2 },
    ];
  },

  /**
   * Herd production & quality trends
   */
  async getHerdProductionTrends() {
    await new Promise((res) => setTimeout(res, 40));
    return [
      { date: 'Sep 15', amLiters: 8120, pmLiters: 7420, avgFat: 4.82, avgSnf: 9.10 },
      { date: 'Sep 16', amLiters: 8200, pmLiters: 7500, avgFat: 4.84, avgSnf: 9.12 },
      { date: 'Sep 17', amLiters: 8150, pmLiters: 7480, avgFat: 4.80, avgSnf: 9.08 },
      { date: 'Sep 18', amLiters: 8280, pmLiters: 7590, avgFat: 4.86, avgSnf: 9.14 },
      { date: 'Sep 19', amLiters: 8310, pmLiters: 7640, avgFat: 4.85, avgSnf: 9.11 },
      { date: 'Sep 20', amLiters: 8350, pmLiters: 7690, avgFat: 4.85, avgSnf: 9.12 },
    ];
  },

  /**
   * Investor 1.5% base vs performance bonus yield distribution history
   */
  async getInvestorYieldHistory(investorId: string) {
    await new Promise((res) => setTimeout(res, 30));
    return [
      { month: 'May 2026', baseYieldINR: 3750, performanceBonusINR: 920, totalEarnedINR: 4670, effectiveYieldPercent: 1.87 },
      { month: 'Jun 2026', baseYieldINR: 3750, performanceBonusINR: 880, totalEarnedINR: 4630, effectiveYieldPercent: 1.85 },
      { month: 'Jul 2026', baseYieldINR: 3750, performanceBonusINR: 900, totalEarnedINR: 4650, effectiveYieldPercent: 1.86 },
      { month: 'Aug 2026', baseYieldINR: 3750, performanceBonusINR: 1000, totalEarnedINR: 4750, effectiveYieldPercent: 1.90 },
      { month: 'Sep 2026', baseYieldINR: 3750, performanceBonusINR: 950, totalEarnedINR: 4700, effectiveYieldPercent: 1.88 },
      { month: 'Oct 2026 (Est)', baseYieldINR: 3750, performanceBonusINR: 960, totalEarnedINR: 4710, effectiveYieldPercent: 1.88 },
    ];
  },
};
