export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface FinancialMetrics {
  bandTariffKwh: number;       // AEDC/IKEDC current Naira per kWh rate for ROI calculations
  typicalSystemSize: string;   // Filters out B2C (e.g., "15kVA - 50kVA")
  estDieselSavings: string;    // e.g., "₦800k - ₦2.5M monthly"
}

export interface EnvironmentalFactors {
  peakSunHours: number;        // Crucial for technical authority (e.g., 5.5h North, 4.2h South)
  weatherChallenge: string;    // Dictates the maintenance pitch (Harmattan vs. Humidity)
  roofingTypology: string[];   // Shows engineering competence (e.g., Concrete slab vs. Aluminum)
}

export interface District {
  slug: string;
  name: string;
  coordinates: GeoCoordinates;
  gridBand: string;
  averageDailyOutage: string;
  primaryGridIssue: string;
  commonHardwareFailures: string[]; // Hyper-localizes the maintenance pages
  targetSectors: string[];
  localLandmarks: string[];
  financials: FinancialMetrics;
  slaDispatchMinutes: number;       // Trust signal: "15-minute response to Wuse"
}

export interface StateZone {
  slug: string;
  name: string;
  region: "North Central" | "South West" | "South South" | "North West" | "South East" | "North East";
  gridProvider: string;
  dieselCostEstimate: string;
  environment: EnvironmentalFactors;
  logisticsHub: string;
  districts: District[];
}

export const NIGERIA_LOCATIONS: StateZone[] = [
  
    {
    slug: "fct",
    name: "Federal Capital Territory",
    region: "North Central",
    gridProvider: "AEDC",
    dieselCostEstimate: "₦1,350/L",
    environment: {
      peakSunHours: 5.2,
      weatherChallenge: "Heavy Harmattan dust between Nov-Feb severely degrading panel efficiency.",
      roofingTypology: ["Concrete Decking", "Stone-Coated Gerard", "Longspan Aluminum"]
    },
    logisticsHub: "Central Business District, Abuja",
    districts: [
      // --- PHASE 1 (CORE CBD & HIGH-BROW) ---
      { 
        slug: "wuse", name: "Wuse", coordinates: { lat: 9.0765, lng: 7.4660 }, gridBand: "Band A", averageDailyOutage: "4-6 hours",
        primaryGridIssue: "Frequent voltage spikes from localized transformer overloading.",
        commonHardwareFailures: ["Blown Inverter MOSFETs", "Swollen Lead-Acid Banks"],
        targetSectors: ["Private Clinics", "Boutiques", "Hotels"], localLandmarks: ["Wuse Market axis", "Aminu Kano Crescent"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "10kVA - 30kVA", estDieselSavings: "₦1.2M+ monthly" }, slaDispatchMinutes: 15
      },
      { 
        slug: "maitama", name: "Maitama", coordinates: { lat: 9.0833, lng: 7.4999 }, gridBand: "Band A", averageDailyOutage: "2-4 hours",
        primaryGridIssue: "Zero-tolerance for server and security system downtime during grid switchovers.",
        commonHardwareFailures: ["BMS (Battery Management System) Lockouts", "Communication faults"],
        targetSectors: ["Embassies", "Corporate HQs", "High-End Restaurants"], localLandmarks: ["Transcorp Hilton axis", "Minister's Hill"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "30kVA - 100kVA+", estDieselSavings: "₦2.5M+ monthly" }, slaDispatchMinutes: 15
      },
      { 
        slug: "asokoro", name: "Asokoro", coordinates: { lat: 9.0433, lng: 7.5190 }, gridBand: "Band A+", averageDailyOutage: "1-3 hours",
        primaryGridIssue: "Seamless automatic changeover delays causing system reboots.",
        commonHardwareFailures: ["Changeover contactor burnouts", "Lithium cell imbalance"],
        targetSectors: ["Luxury Hotels", "Private Clinics", "Diplomatic Residences"], localLandmarks: ["ECOWAS Secretariat", "Aso Drive"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "30kVA - 100kVA", estDieselSavings: "₦2.0M+ monthly" }, slaDispatchMinutes: 20
      },
      { 
        slug: "central-business-district", name: "Central Business District", coordinates: { lat: 9.0583, lng: 7.4893 }, gridBand: "Band A+", averageDailyOutage: "1-2 hours",
        primaryGridIssue: "Complex 3-phase synchronization with massive central HVAC systems.",
        commonHardwareFailures: ["Phase imbalances tripping 3-phase inverters", "Overheating charge controllers"],
        targetSectors: ["Bank HQs", "Ministries", "Mega-Hotels"], localLandmarks: ["NNPC Towers", "Central Mosque Axis"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "50kVA - 250kVA+", estDieselSavings: "₦5.0M+ monthly" }, slaDispatchMinutes: 10
      },
      { 
        slug: "guzape", name: "Guzape (Asokoro Ext.)", coordinates: { lat: 9.0261, lng: 7.5165 }, gridBand: "Band A", averageDailyOutage: "3-5 hours",
        primaryGridIssue: "High elevation exposing arrays to severe lightning strikes and wind sheer.",
        commonHardwareFailures: ["Surge protection device (SPD) failure", "Mounting rack wind damage"],
        targetSectors: ["Luxury Real Estate", "High-End Event Centers", "Private Hospitals"], localLandmarks: ["COZA Axis", "Guzape Hills"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "20kVA - 50kVA", estDieselSavings: "₦1.8M+ monthly" }, slaDispatchMinutes: 25
      },
      { 
        slug: "garki", name: "Garki", coordinates: { lat: 9.0298, lng: 7.4913 }, gridBand: "Band A", averageDailyOutage: "4-6 hours",
        primaryGridIssue: "Heavy commercial density causing massive voltage drops during peak hours.",
        commonHardwareFailures: ["Low-voltage disconnect loop errors", "Burnt AC breakers"],
        targetSectors: ["Supermarkets", "Government Annexes", "Hospitals"], localLandmarks: ["Area 11", "Garki International Market"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "15kVA - 50kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 15
      },

      // --- PHASE 2 (COMMERCIAL HUBS & HIGH-DENSITY) ---
      { 
        slug: "jabi", name: "Jabi", coordinates: { lat: 9.0722, lng: 7.4249 }, gridBand: "Band A", averageDailyOutage: "4-6 hours",
        primaryGridIssue: "High AC loads from retail hubs causing rapid battery depletion.",
        commonHardwareFailures: ["Thermal throttling on inverters", "Deeply discharged lithium banks"],
        targetSectors: ["Shopping Malls", "Tech Hubs", "Recreation Centers"], localLandmarks: ["Jabi Lake Mall", "Bala Sokoto Way"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "20kVA - 60kVA", estDieselSavings: "₦1.6M+ monthly" }, slaDispatchMinutes: 20
      },
      { 
        slug: "utako", name: "Utako", coordinates: { lat: 9.0631, lng: 7.4385 }, gridBand: "Band B", averageDailyOutage: "5-7 hours",
        primaryGridIssue: "Erratic grid frequency from heavy industrial/transport equipment.",
        commonHardwareFailures: ["Inverter synchronization failure", "Burnt transfer switches"],
        targetSectors: ["Transport Hubs", "Warehouses", "Mid-Tier Hotels"], localLandmarks: ["Utako Market", "Jibowu Street Transports"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "15kVA - 40kVA", estDieselSavings: "₦1.4M+ monthly" }, slaDispatchMinutes: 20
      },
      { 
        slug: "wuye", name: "Wuye", coordinates: { lat: 9.0435, lng: 7.4419 }, gridBand: "Band B", averageDailyOutage: "5-8 hours",
        primaryGridIssue: "Rapid estate expansion overloading local grid infrastructure.",
        commonHardwareFailures: ["Grid charger module burnouts", "Poor earthing damage"],
        targetSectors: ["New Corporate Plazas", "Large Private Estates", "Schools"], localLandmarks: ["Wuye Ultra Modern Market", "Family Worship Centre"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "10kVA - 30kVA", estDieselSavings: "₦1.2M+ monthly" }, slaDispatchMinutes: 20
      },
      { 
        slug: "mabushi", name: "Mabushi", coordinates: { lat: 9.0769, lng: 7.4429 }, gridBand: "Band A", averageDailyOutage: "3-5 hours",
        primaryGridIssue: "Ministry-level HVAC systems requiring complex soft-start integration.",
        commonHardwareFailures: ["Start-up surge overload", "Inverter capacitor failure"],
        targetSectors: ["Government Ministries", "Construction HQs", "Large Clinics"], localLandmarks: ["Ministry of Works", "VIO Headquarters"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "30kVA - 100kVA", estDieselSavings: "₦2.2M+ monthly" }, slaDispatchMinutes: 15
      },
      { 
        slug: "katampe", name: "Katampe & Ext.", coordinates: { lat: 9.0988, lng: 7.4673 }, gridBand: "Band A", averageDailyOutage: "3-6 hours",
        primaryGridIssue: "Rocky terrain making proper earth grounding extremely difficult.",
        commonHardwareFailures: ["Floating neutral damage", "Lightning-induced motherboard failure"],
        targetSectors: ["Diplomatic Residences", "Broadcast Stations", "Boutique Hotels"], localLandmarks: ["Aso Radio", "Katampe Hill"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "15kVA - 40kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 25
      },
      { 
        slug: "apo", name: "Apo", coordinates: { lat: 8.9890, lng: 7.4870 }, gridBand: "Band B", averageDailyOutage: "5-7 hours",
        primaryGridIssue: "Severe voltage drops at the end of AEDC feeder lines.",
        commonHardwareFailures: ["Under-voltage protection lockouts", "Battery deep-discharge damage"],
        targetSectors: ["Mechanic Hubs", "Commercial Plazas", "Supermarkets"], localLandmarks: ["Apo Legislative Quarters", "Apo Mechanic Village"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "15kVA - 40kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 25
      },
      { 
        slug: "gudu", name: "Gudu", coordinates: { lat: 8.9954, lng: 7.4725 }, gridBand: "Band B", averageDailyOutage: "6-8 hours",
        primaryGridIssue: "Heavy daytime retail usage demanding constant hybrid blending.",
        commonHardwareFailures: ["MPPT Controller overheating", "Dust accumulation in fans"],
        targetSectors: ["Automobile Showrooms", "Large Retail Markets", "Offices"], localLandmarks: ["Gudu Market", "Oladipo Diya Road"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "10kVA - 30kVA", estDieselSavings: "₦1.3M+ monthly" }, slaDispatchMinutes: 25
      },

      // --- PHASE 3 (SUBURBAN COMMERCIAL HUBS) ---
      { 
        slug: "gwarinpa", name: "Gwarinpa", coordinates: { lat: 9.1098, lng: 7.4101 }, gridBand: "Band B", averageDailyOutage: "6-10 hours",
        primaryGridIssue: "Extended daytime outages forcing heavy daily diesel burn for retail.",
        commonHardwareFailures: ["Premature Lithium cell degradation", "Thermal throttling"],
        targetSectors: ["Plazas", "Supermarkets", "Pharmacies"], localLandmarks: ["Chemian Plaza", "1st to 3rd Avenue"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "15kVA - 40kVA", estDieselSavings: "₦1.8M+ monthly" }, slaDispatchMinutes: 30
      },
      { 
        slug: "life-camp", name: "Life Camp", coordinates: { lat: 9.0880, lng: 7.4040 }, gridBand: "Band A", averageDailyOutage: "3-5 hours",
        primaryGridIssue: "Grid instability affecting delicate smart-home and foreign appliances.",
        commonHardwareFailures: ["Surge protector burnouts", "Inverter display failures"],
        targetSectors: ["Expat Residences", "Private Clubs", "High-End Clinics"], localLandmarks: ["Julius Berger HQ", "Life Camp Roundabout"],
        financials: { bandTariffKwh: 225, typicalSystemSize: "15kVA - 30kVA", estDieselSavings: "₦1.4M+ monthly" }, slaDispatchMinutes: 25
      },
      { 
        slug: "kado", name: "Kado", coordinates: { lat: 9.0762, lng: 7.4144 }, gridBand: "Band B", averageDailyOutage: "5-8 hours",
        primaryGridIssue: "Proximity to the lake increasing ambient humidity and condensation.",
        commonHardwareFailures: ["Corroded battery terminals", "Moisture in junction boxes"],
        targetSectors: ["Fish Markets", "Cold Rooms", "Estates"], localLandmarks: ["Kado Fish Market", "NAF Conference Centre"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "10kVA - 40kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 25
      },
      { 
        slug: "lokogoma", name: "Lokogoma", coordinates: { lat: 8.9710, lng: 7.4350 }, gridBand: "Band B", averageDailyOutage: "6-9 hours",
        primaryGridIssue: "Rapidly expanding estates overloading local transformers.",
        commonHardwareFailures: ["Grid-charging failures due to low voltage", "Solar charge controller faults"],
        targetSectors: ["Estate Facility Managers", "Retail Plazas", "Schools"], localLandmarks: ["Lokogoma Expressway", "Sunnyvale Estate"],
        financials: { bandTariffKwh: 63, typicalSystemSize: "10kVA - 20kVA", estDieselSavings: "₦1.0M+ monthly" }, slaDispatchMinutes: 35
      },
      { 
        slug: "galadimawa", name: "Galadimawa", coordinates: { lat: 8.9667, lng: 7.4167 }, gridBand: "Band C", averageDailyOutage: "7-10 hours",
        primaryGridIssue: "Chronic load shedding due to underdeveloped infrastructure.",
        commonHardwareFailures: ["Total battery bank failure from chronic deep discharge", "Burnt AC inputs"],
        targetSectors: ["Mid-tier Clinics", "Private Schools", "Supermarkets"], localLandmarks: ["Galadimawa Roundabout", "Suncity Estate"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "10kVA - 20kVA", estDieselSavings: "₦1.1M+ monthly" }, slaDispatchMinutes: 35
      },

      // --- SATELLITE TOWNS & INDUSTRIAL ZONES (HIGH PAIN, HIGH DIESEL) ---
      { 
        slug: "lugbe", name: "Lugbe", coordinates: { lat: 8.9710, lng: 7.3750 }, gridBand: "Band C", averageDailyOutage: "8-12 hours",
        primaryGridIssue: "Severe transformer rationing causing extreme dependency on generators.",
        commonHardwareFailures: ["Generator-inverter sync issues", "Vibration damage from heavy machinery"],
        targetSectors: ["Shopping Plazas", "Mid-tier Clinics", "Hotels"], localLandmarks: ["FHA Estate", "Airport Road Axis"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "10kVA - 25kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 40
      },
      { 
        slug: "kubwa", name: "Kubwa", coordinates: { lat: 9.1522, lng: 7.3323 }, gridBand: "Band C", averageDailyOutage: "8-10 hours",
        primaryGridIssue: "Chronic load shedding and frequent transformer blowouts.",
        commonHardwareFailures: ["Dust-clogged cooling fans", "Burnt AC input terminals"],
        targetSectors: ["General Hospitals", "Large Markets", "Agro-processing facilities"], localLandmarks: ["Kubwa Market", "NYSC Camp Axis"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "15kVA - 30kVA", estDieselSavings: "₦1.2M+ monthly" }, slaDispatchMinutes: 45
      },
      { 
        slug: "mpape", name: "Mpape", coordinates: { lat: 9.1350, lng: 7.4983 }, gridBand: "Band D", averageDailyOutage: "10-14 hours",
        primaryGridIssue: "Severe dust pollution from local quarries blocking solar irradiance.",
        commonHardwareFailures: ["Heavily soiled panels losing 50% yield", "Dust shorting inverter boards"],
        targetSectors: ["Quarry Offices", "Warehouses", "Local Clinics"], localLandmarks: ["Crushed Rock Axis", "Mpape Junction"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "10kVA - 20kVA", estDieselSavings: "₦1.1M+ monthly" }, slaDispatchMinutes: 40
      },
      { 
        slug: "dawaki", name: "Dawaki / Dutse", coordinates: { lat: 9.1419, lng: 7.3822 }, gridBand: "Band C", averageDailyOutage: "7-10 hours",
        primaryGridIssue: "Irregular voltage delivery destroying sensitive electronics.",
        commonHardwareFailures: ["Burnt capacitors", "Failed changeover switches"],
        targetSectors: ["Private Schools", "Boutique Hotels", "Retail Outlets"], localLandmarks: ["Dawaki News Engineering", "Dutse Alhaji"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "10kVA - 20kVA", estDieselSavings: "₦1.0M+ monthly" }, slaDispatchMinutes: 40
      },

      // --- OUTLYING AREA COUNCILS (MASSIVE COMMERCIAL/INSTITUTIONAL INSTALLS) ---
      { 
        slug: "gwagwalada", name: "Gwagwalada", coordinates: { lat: 8.9405, lng: 7.0784 }, gridBand: "Band C", averageDailyOutage: "8-12 hours",
        primaryGridIssue: "Heavy institutional loads requiring massive 3-phase hybrid systems.",
        commonHardwareFailures: ["Overloaded battery banks", "Phase imbalance trips"],
        targetSectors: ["University Facilities", "Teaching Hospitals", "Large Agro-Allied Farms"], localLandmarks: ["UniAbuja Axis", "Teaching Hospital Road"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "30kVA - 150kVA", estDieselSavings: "₦3.5M+ monthly" }, slaDispatchMinutes: 75
      },
      { 
        slug: "bwari", name: "Bwari", coordinates: { lat: 9.2783, lng: 7.3800 }, gridBand: "Band C", averageDailyOutage: "8-12 hours",
        primaryGridIssue: "Extended blackouts severely impacting educational administrative servers.",
        commonHardwareFailures: ["Deeply discharged SLA batteries", "Burnt out cooling fans from constant running"],
        targetSectors: ["Institutions", "Large Farms", "Printing Presses"], localLandmarks: ["Law School Axis", "JAMB Headquarters"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "20kVA - 100kVA", estDieselSavings: "₦2.0M+ monthly" }, slaDispatchMinutes: 70
      },
      { 
        slug: "kuje", name: "Kuje", coordinates: { lat: 8.8787, lng: 7.2307 }, gridBand: "Band C", averageDailyOutage: "10-14 hours",
        primaryGridIssue: "Heavy reliance on solar water pumping for large-scale agriculture.",
        commonHardwareFailures: ["Submersible pump controller burnouts", "Panel theft/vandalism"],
        targetSectors: ["Commercial Farms", "Factories", "Correctional Facility Annexes"], localLandmarks: ["Kuje Market", "Forest Road"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "15kVA - 50kVA", estDieselSavings: "₦1.8M+ monthly" }, slaDispatchMinutes: 65
      },
      { 
        slug: "karu", name: "Karu & Nyanya", coordinates: { lat: 9.0069, lng: 7.5750 }, gridBand: "Band C", averageDailyOutage: "8-12 hours",
        primaryGridIssue: "Extreme population density causing constant transformer failure.",
        commonHardwareFailures: ["Grid-tied chargers failing from low voltage", "Dust accumulation"],
        targetSectors: ["Massive Retail Plazas", "Large Bakeries", "Private Hospitals"], localLandmarks: ["Nyanya Market", "Karu Site Axis"],
        financials: { bandTariffKwh: 50, typicalSystemSize: "15kVA - 40kVA", estDieselSavings: "₦1.5M+ monthly" }, slaDispatchMinutes: 50
      }
    ]
  
  },
  {
    // STAGED FOR LATER SCALING
    slug: "lagos",
    name: "Lagos State",
    region: "South West",
    gridProvider: "IKEDC & EKEDC",
    dieselCostEstimate: "₦1,250/L",
    environment: {
      peakSunHours: 4.1, // Lower than Abuja due to coastal cloud cover
      weatherChallenge: "High humidity and coastal salt spray accelerating metal corrosion.",
      roofingTypology: ["Flat Concrete", "Corrugated Metal"]
    },
    logisticsHub: "Ikeja GRA, Lagos",
    districts: [
      { 
        slug: "victoria-island", 
        name: "Victoria Island", 
        coordinates: { lat: 6.4281, lng: 3.4219 },
        gridBand: "Band A",
        averageDailyOutage: "3-5 hours",
        primaryGridIssue: "Grid instability during heavy rains and localized flooding.",
        commonHardwareFailures: ["Rusted mounting racks", "Moisture ingress in junction boxes"],
        targetSectors: ["Banks", "Fintech HQs", "Hospitality"],
        localLandmarks: ["Adeola Odeku", "Ahmadu Bello Way", "Eko Atlantic axis"],
        financials: {
          bandTariffKwh: 225,
          typicalSystemSize: "50kVA - 250kVA",
          estDieselSavings: "₦4M+ monthly"
        },
        slaDispatchMinutes: 25
      }
    ]
  }
];


















// export interface City {
//   slug: string;
//   name: string;
//   targetSectors: string[];
// }

// export interface StateLocation {
//   slug: string;
//   name: string;
//   gridProvider: string; // e.g., IKEDC, AEDC, PHED
//   dieselCostEstimate: string; // Fluctuates by region
//   cities: City[];
// }

// export const NIGERIA_LOCATIONS: StateLocation[] = [
//   {
//     slug: "fct",
//     name: "Federal Capital Territory",
//     gridProvider: "AEDC (Abuja Electricity Distribution Company)",
//     dieselCostEstimate: "₦1,350/L",
//     cities: [
//       { slug: "wuse", name: "Wuse", targetSectors: ["Clinics", "Boutiques"] },
//       { slug: "maitama", name: "Maitama", targetSectors: ["Embassies", "Corporate HQs"] },
//       // ... Add all 20+ FCT districts here
//     ]
//   },
//   {
//     slug: "lagos",
//     name: "Lagos State",
//     gridProvider: "IKEDC & EKEDC",
//     dieselCostEstimate: "₦1,250/L", // Port proximity makes it slightly cheaper
//     cities: [
//       { slug: "lekki", name: "Lekki", targetSectors: ["Tech Hubs", "Luxury Hotels", "Real Estate"] },
//       { slug: "ikeja", name: "Ikeja", targetSectors: ["Industrial Hubs", "Corporate Offices"] },
//       { slug: "victoria-island", name: "Victoria Island", targetSectors: ["Banks", "Fintech HQs"] },
//       // ... Add all Lagos LGAs/Hubs here
//     ]
//   },
//   {
//     slug: "rivers",
//     name: "Rivers State",
//     gridProvider: "PHED (Port Harcourt Electricity)",
//     dieselCostEstimate: "₦1,300/L",
//     cities: [
//       { slug: "port-harcourt", name: "Port Harcourt", targetSectors: ["Oil & Gas Servicing", "Hotels"] },
//       { slug: "obio-akpor", name: "Obio-Akpor", targetSectors: ["Industrial", "Retail"] }
//     ]
//   }
//   // ... You can easily scale this to all 36 States
// ];