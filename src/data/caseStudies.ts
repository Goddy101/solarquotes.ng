export type MarketSegment = 'Commercial' | 'Residential' | 'Industrial' | 'Healthcare' | 'Agro-Allied';

export interface SystemArchitecture {
  inverterTopology: string;     // e.g., "3x 50kVA 3-Phase Hybrid Synchronized"
  batteryStorage: string;       // e.g., "200kWh High-Voltage LiFePO4"
  solarArray: string;           // e.g., "120kWp Tier-1 Monocrystalline N-Type"
  balanceOfSystem: string[];    // e.g., ["Active Phase Balancers", "0ms Solid State ATS", "Surge Arresters"]
}

export interface FinancialImpact {
  monthlyDieselAvoidedLiters: number;
  monthlyNairaSavings: string;
  paybackPeriodMonths: number;
  projected10YearROI: string;
  irr: string; // Internal Rate of Return (Crucial for CFOs/Commercial clients)
}

export interface CaseStudy {
  slug: string;
  title: string;
  market: MarketSegment;
  clientIndustry: string;
  location: {
    state: string;
    district: string;
    gridBand: string;
  };
  completionYear: number;
  
  // AEO (Answer Engine) Narrative
  executiveSummary: string;
  infrastructuralChallenge: string;
  engineeringSolution: string;
  
  // Hard Specs
  architecture: SystemArchitecture;
  financials: FinancialImpact;
  
  // Trust Signals
  headlineMetrics: {
    label: string;
    value: string;
  }[];
  clientTestimonial?: {
    quote: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "maitama-diplomatic-residence",
    title: "Zero-Downtime Microgrid for a Maitama Diplomatic Compound",
    market: "Residential",
    clientIndustry: "Diplomatic / High-Net-Worth",
    location: {
      state: "FCT",
      district: "Maitama",
      gridBand: "AEDC Band A"
    },
    completionYear: 2025,
    
    executiveSummary: "Eliminated 100% of diesel dependency for a high-security diplomatic residence facing erratic voltage spikes and 3-hour daily localized grid failures.",
    infrastructuralChallenge: "Despite being on AEDC Band A, the compound suffered from micro-outages and severe voltage fluctuations (170V - 250V). The existing 60kVA diesel generator's 15-second changeover delay was causing security server reboots and damaging imported sensitive HVAC control boards.",
    engineeringSolution: "Engineered a closed-loop microgrid. Incoming grid power now passes through the inverter's active voltage regulation before hitting the house. A solid-state transfer switch guarantees 0ms switchover, while the 40kWh high-voltage lithium bank absorbs all HVAC starting surges.",
    
    architecture: {
      inverterTopology: "30kVA 3-Phase Low-Frequency Hybrid",
      batteryStorage: "40kWh LiFePO4 (Rack Mounted, 10,000 cycle rating)",
      solarArray: "25kWp N-Type Half-Cut Monocrystalline",
      balanceOfSystem: ["0ms Solid State ATS", "Whole-House Surge Protection (Type 2)", "Smart Load Shedding Relays"]
    },
    
    financials: {
      monthlyDieselAvoidedLiters: 950,
      monthlyNairaSavings: "₦1,280,000",
      paybackPeriodMonths: 26,
      projected10YearROI: "340%",
      irr: "41%"
    },
    
    headlineMetrics: [
      { label: "Grid Independence", value: "98.5%" },
      { label: "Transfer Time", value: "0ms" },
      { label: "Daily Yield", value: "115 kWh" },
      { label: "Voltage Stability", value: "230V ± 1%" }
    ],
    
    clientTestimonial: {
      quote: "The system is entirely invisible. We haven't heard the generator start in six months, and our server uptime is flawless.",
      role: "Chief of Mission Security"
    }
  },
  {
    slug: "ikeja-manufacturing-load-balancing",
    title: "Heavy Inductive Load Phase Balancing for Plastics Manufacturing",
    market: "Industrial",
    clientIndustry: "FMCG Manufacturing",
    location: {
      state: "Lagos",
      district: "Ikeja GRA",
      gridBand: "IKEDC Band A"
    },
    completionYear: 2026,
    
    executiveSummary: "Engineered a 150kVA synchronized hybrid array to stabilize extreme phase imbalances caused by heavy injection molding machines, saving ₦4.8M monthly.",
    infrastructuralChallenge: "Heavy inductive motor loads (injection molders) were causing severe asymmetrical phase imbalances and voltage drops. Standard grid-tied inverters were tripping instantly on startup surges, forcing the facility to run a 250kVA diesel generator 8 hours a day despite grid availability.",
    engineeringSolution: "Deployed a parallel 150kVA active phase-balancing hybrid system using industrial-grade soft starters. A 200kWh high-voltage battery bank was installed specifically to absorb motor inrush currents, allowing the system to seamlessly blend grid power and solar without tripping.",
    
    architecture: {
      inverterTopology: "3x 50kVA High-Voltage Hybrid (Parallel Synchronized)",
      batteryStorage: "200kWh High-Voltage LiFePO4 Cluster",
      solarArray: "120kWp Tier-1 Bifacial",
      balanceOfSystem: ["Active Phase Balancers", "Industrial Soft Starters", "SCADA Integration"]
    },
    
    financials: {
      monthlyDieselAvoidedLiters: 3800,
      monthlyNairaSavings: "₦4,850,000",
      paybackPeriodMonths: 21,
      projected10YearROI: "480%",
      irr: "54%"
    },
    
    headlineMetrics: [
      { label: "Production Uptime", value: "99.9%" },
      { label: "Surge Capacity", value: "300kVA (10s)" },
      { label: "Phase Imbalance", value: "< 2%" },
      { label: "Liters Saved/Yr", value: "45,600 L" }
    ]
  },
  {
    slug: "wuse-diagnostic-clinic",
    title: "Medical-Grade Power Security for Wuse Diagnostic Center",
    market: "Healthcare",
    clientIndustry: "Private Healthcare",
    location: {
      state: "FCT",
      district: "Wuse",
      gridBand: "AEDC Band A"
    },
    completionYear: 2025,
    
    executiveSummary: "Provided uninterrupted, pure sine-wave power to MRI and continuous-monitoring ICU equipment, eliminating data corruption from grid fluctuations.",
    infrastructuralChallenge: "The clinic's MRI and ultrasound machines were suffering from micro-cuts and harmonic distortion from the local AEDC transformer, resulting in corrupted scans and equipment degradation. A conventional diesel backup was too slow and too loud for the recovery ward.",
    engineeringSolution: "Installed a dual-redundant 50kVA system acting as a continuous online UPS. The solar array prioritizes charging the critical-load battery bank, ensuring medical equipment is perfectly isolated from grid harmonics and runs on pure synthesized sine-wave power 24/7.",
    
    architecture: {
      inverterTopology: "50kVA Online-UPS Hybrid",
      batteryStorage: "80kWh LiFePO4",
      solarArray: "40kWp Monocrystalline",
      balanceOfSystem: ["Harmonic Filters", "Galvanic Isolation Transformers", "Critical Load Sub-panel"]
    },
    
    financials: {
      monthlyDieselAvoidedLiters: 1200,
      monthlyNairaSavings: "₦1,620,000",
      paybackPeriodMonths: 24,
      projected10YearROI: "390%",
      irr: "46%"
    },
    
    headlineMetrics: [
      { label: "THD (Distortion)", value: "< 1.5%" },
      { label: "Scan Corruption", value: "0 Cases" },
      { label: "Noise Reduction", value: "-85 dB" },
      { label: "ROI Break-Even", value: "24 Mos" }
    ],
    
    clientTestimonial: {
      quote: "The sheer quality of the power has extended the lifespan of our diagnostic equipment. The financial savings are just a bonus.",
      role: "Medical Director"
    }
  }
];