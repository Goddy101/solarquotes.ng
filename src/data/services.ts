export interface Service {
  slug: string;           // URL routing (e.g., /commercial-solar-hybrid/...)
  title: string;          // H1 tag and full page title
  shortName: string;      // Used for breadcrumbs, mobile nav, and tight UI spaces
  description: string;    // High-conversion sales copy for the hero section
  basePrice: string;      // Price anchoring for the financial calculator
  market: 'residential' | 'commercial' | 'both'; 
  schemaType: string;     // Explicit Schema.org type for Google Rich Snippets
  lsiKeywords: string[];  // Semantic variations injected into page copy
  hardwareTiers: string;  // Context for AI crawlers and buyer trust
}

export const SERVICES: Service[] = [
  // --------------------------------------------------------
  // COMMERCIAL & B2B MARKET
  // --------------------------------------------------------
  {
    slug: "commercial-solar-hybrid",
    title: "Commercial Solar Hybrid Systems",
    shortName: "Commercial Solar",
    description: "High-capacity 3-phase solar hybrid systems designed to eliminate diesel costs for corporate offices, hotels, and hospitals.",
    basePrice: "₦15,000,000",
    market: "commercial",
    schemaType: "InstallationService",
    lsiKeywords: [
      "Turnkey solar hybrid systems", 
      "3-phase inverter arrays", 
      "Diesel cost reduction (ROI)", 
      "Commercial grid-tie", 
      "Heavy HVAC and Server load solar"
    ],
    hardwareTiers: "30kVA to 250kVA+ (3-Phase Systems)"
  },
  {
    slug: "industrial-inverter-battery",
    title: "Industrial Inverter & Battery Banks",
    shortName: "Industrial Inverters",
    description: "Heavy-duty tier-1 inverter arrays and rack-mounted LiFePO4 battery banks for manufacturing plants and heavy machinery load handling.",
    basePrice: "₦25,000,000",
    market: "commercial",
    schemaType: "InstallationService",
    lsiKeywords: [
      "High-voltage battery racks",
      "Factory solar integration",
      "Industrial LiFePO4 cells",
      "Peak shaving inverter system"
    ],
    hardwareTiers: "50kVA to 500kVA (Heavy Industrial)"
  },
  {
    slug: "diesel-generator-replacement",
    title: "Diesel Generator Replacement",
    shortName: "Gen Replacement",
    description: "Complete transition from noisy, expensive diesel generators to silent, zero-emission solar microgrids with ROI under 18 months.",
    basePrice: "₦12,000,000",
    market: "commercial",
    schemaType: "ProfessionalService",
    lsiKeywords: [
      "Mikano replacement solar",
      "Diesel hybrid controller",
      "Fuel cost elimination",
      "Silent commercial backup"
    ],
    hardwareTiers: "Matched to existing 20kVA - 100kVA gensets"
  },
  {
    slug: "solar-audit-load-profiling",
    title: "C&I Solar Audit & Load Profiling",
    shortName: "Load Profiling Audit",
    description: "Precision energy auditing and phase-balance profiling using thermal imaging and smart meters to design the perfect C&I solar architecture.",
    basePrice: "₦150,000",
    market: "commercial",
    schemaType: "ProfessionalService",
    lsiKeywords: [
      "Phase balancing", 
      "Power factor correction", 
      "Surge protection retrofits (SPD)", 
      "Smart changeover integration",
      "Thermal imaging electrical audit"
    ],
    hardwareTiers: "Heavy HVAC, Factory, and Medical integrations"
  },

  // --------------------------------------------------------
  // RESIDENTIAL MARKET
  // --------------------------------------------------------
  {
    slug: "residential-premium-backup",
    title: "Residential Premium Backup",
    shortName: "Premium Residential",
    description: "Seamless solar integrations for duplexes and luxury apartments, guaranteeing 24/7 power and zero grid reliance.",
    basePrice: "₦3,500,000",
    market: "residential",
    schemaType: "InstallationService",
    lsiKeywords: [
      "Petrol generator replacement", 
      "Silent home inverter setup", 
      "Borehole solar pump integration", 
      "Lithium battery for inverter ACs", 
      "24/7 home power backup"
    ],
    hardwareTiers: "5kVA to 15kVA (Single & 3-Phase Systems)"
  },

  // --------------------------------------------------------
  // SHARED / LIFETIME VALUE (SLA)
  // --------------------------------------------------------
  {
    slug: "solar-maintenance-sla",
    title: "Solar Maintenance & Uptime SLA",
    shortName: "Maintenance SLA",
    description: "Annual proactive maintenance, panel washing, and thermal terminal inspections to guarantee peak system efficiency and protect your warranty.",
    basePrice: "₦60,000/Quarter",
    market: "both",
    schemaType: "MaintenanceService",
    lsiKeywords: [
      "Inverter motherboard repair", 
      "Lithium battery cell balancing", 
      "Thermal imaging inspections", 
      "Preventative panel cleaning",
      "Grid-charger module fix"
    ],
    hardwareTiers: "All existing Residential & Commercial arrays"
  }
];