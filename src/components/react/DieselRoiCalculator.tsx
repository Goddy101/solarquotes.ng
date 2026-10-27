import { useState, useMemo } from 'react';

interface DieselRoiProps {
  districtName: string;
  dieselCostEstimate: string; // e.g., "₦1,350/L"
  averageDailyOutage: string; // e.g., "4-6 hours"
  bandTariffKwh: number;      // e.g., 225
}

export default function DieselRoiCalculator({
  districtName,
  dieselCostEstimate,
  averageDailyOutage,
  bandTariffKwh
}: DieselRoiProps) {
  // 1. Data Extraction & Parsing
  const dieselPriceStr = dieselCostEstimate.replace(/[^\d]/g, '');
  const dieselPrice = parseInt(dieselPriceStr, 10) || 1350;

  // Extract a sensible default for the slider from strings like "4-6 hours"
  const defaultHoursStr = averageDailyOutage.match(/\d+/);
  const defaultHours = defaultHoursStr ? parseInt(defaultHoursStr[0], 10) : 5;

  // 2. React State (Interactive Sliders)
  const [kva, setKva] = useState<number>(30); // Default to a standard clinic/mid-size hotel
  const [hours, setHours] = useState<number>(defaultHours);

  // 3. The Financial Engineering Engine
  const metrics = useMemo(() => {
    // Standard industrial rule of thumb: A generator burns ~0.2 liters per kVA per hour at 75% load
    const litersPerHour = kva * 0.2; 
    const dailyLiters = litersPerHour * hours;
    
    // Diesel Costs
    const dailyDieselCost = dailyLiters * dieselPrice;
    const monthlyDieselCost = dailyDieselCost * 30;
    const yearlyDieselCost = monthlyDieselCost * 12;
    const fiveYearDieselCost = yearlyDieselCost * 5;

    // Grid Equivalent (What they SHOULD be paying if the grid was stable)
    // kVA * 0.8 Power Factor = kW
    const gridKw = kva * 0.8; 
    const monthlyGridCost = gridKw * hours * 30 * bandTariffKwh; 

    // The Solar ROI Pitch (Rough estimate of turnkey CapEx: ₦900k per kVA)
    const estSolarCapEx = kva * 900000;
    const paybackMonths = Math.ceil(estSolarCapEx / monthlyDieselCost);

    return {
      monthlyDieselCost,
      yearlyDieselCost,
      fiveYearDieselCost,
      monthlyGridCost,
      paybackMonths
    };
  }, [kva, hours, dieselPrice, bandTariffKwh]);

  // Currency Formatter
  const formatNGN = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden mt-8">
      {/* Header */}
      <div className="bg-red-50/50 border-b border-red-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">The Diesel Bleed Calculator</h3>
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
            Live {districtName} Data
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Based on local diesel rates ({dieselCostEstimate}) and Grid Tariff (₦{bandTariffKwh}/kWh).
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="kva-slider" className="text-sm font-semibold text-gray-700">Facility Generator Size</label>
              <span className="text-lg font-bold text-emerald-600">{kva} kVA</span>
            </div>
            <input 
              id="kva-slider"
              type="range" 
              min="10" 
              max="250" 
              step="5"
              value={kva} 
              onChange={(e) => setKva(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="hours-slider" className="text-sm font-semibold text-gray-700">Daily Outage / Generator Run Time</label>
              <span className="text-lg font-bold text-red-600">{hours} Hours/Day</span>
            </div>
            <input 
              id="hours-slider"
              type="range" 
              min="1" 
              max="24" 
              value={hours} 
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>
        </div>

        {/* Data Output Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Monthly Diesel Spend</p>
            <p className="text-3xl font-extrabold text-gray-900">{formatNGN(metrics.monthlyDieselCost)}</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              vs. {formatNGN(metrics.monthlyGridCost)} on Grid Power
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <p className="text-sm text-red-600 font-semibold mb-1">5-Year Capital Lost to Diesel</p>
            <p className="text-3xl font-extrabold text-red-700">{formatNGN(metrics.fiveYearDieselCost)}</p>
            <p className="text-xs text-red-500 mt-2 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              100% Unrecoverable Expense
            </p>
          </div>
        </div>

        {/* The Closer */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-5 rounded-xl text-white shadow-inner flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">Estimated Solar Break-Even</h4>
            <p className="text-emerald-100 text-sm mt-1">A turnkey system pays for itself in just:</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-right">
            <span className="text-4xl font-extrabold">{metrics.paybackMonths}</span>
            <span className="block text-sm text-emerald-100 font-semibold uppercase tracking-wider">Months</span>
          </div>
        </div>
      </div>
    </div>
  );
}