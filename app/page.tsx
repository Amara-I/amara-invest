
"use client";
import { useState } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#080B12", panel: "#0D1117", border: "#1C2333",
  gold: "#D4A843", goldDim: "#7A5E20",
  green: "#22C55E", red: "#EF4444", blue: "#3B82F6",
  silver: "#94A3B8", text: "#E2D9C5", textDim: "#6B7280",
  teal: "#14B8A6", purple: "#A855F7",
};

// ── DRAPEAUX ─────────────────────────────────────────────────────────────────
const FLAGS = {
  "Côte d\'Ivoire": "🇨🇮", "Sénégal": "🇸🇳", "Burkina Faso": "🇧🇫",
  "Bénin": "🇧🇯", "Mali": "🇲🇱", "Niger": "🇳🇪", "Togo": "🇹🇬",
  "Guinée-Bissau": "🇬🇼", "Kenya": "🇰🇪", "Nigeria": "🇳🇬",
  "Ghana": "🇬🇭", "Afrique du Sud": "🇿🇦", "Maroc": "🇲🇦",
  "Égypte": "🇪🇬", "Maurice": "🇲🇺",
};

// ── COULEURS SECTEURS ─────────────────────────────────────────────────────────
const SECTOR_COLORS = {
  "Banques": "#2563eb", "Télécoms": "#db2777", "Énergie": "#dc2626",
  "Industrie": "#7c3aed", "Distribution": "#d97706", "Transport": "#ea580c",
  "Agriculture": "#16a34a", "Finance": "#0891b2", "Conso. Base": "#65A30D",
  "Tech": "#0EA5E9", "Mines": "#92400e", "Santé": "#10B981",
};

// ── MARCHÉS ──────────────────────────────────────────────────────────────────
const MARKETS = [
  {
    id: "BRVM",
    name: "BRVM",
    fullName: "Bourse Régionale des Valeurs Mobilières",
    country: "UEMOA",
    flag: "🌍",
    currency: "FCFA",
    color: "#D4A843",
    description: "8 pays — Abidjan, Côte d\'Ivoire",
  },
  {
    id: "NSE",
    name: "NSE Nigeria",
    fullName: "Nigerian Stock Exchange",
    country: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    color: "#22C55E",
    description: "Lagos, Nigeria",
  },
  {
    id: "GSE",
    name: "GSE Ghana",
    fullName: "Ghana Stock Exchange",
    country: "Ghana",
    flag: "🇬🇭",
    currency: "GHS",
    color: "#EF4444",
    description: "Accra, Ghana",
  },
  {
    id: "NSE_KE",
    name: "NSE Kenya",
    fullName: "Nairobi Securities Exchange",
    country: "Kenya",
    flag: "🇰🇪",
    currency: "KES",
    color: "#3B82F6",
    description: "Nairobi, Kenya",
  },
  {
    id: "JSE",
    name: "JSE Afrique du Sud",
    fullName: "Johannesburg Stock Exchange",
    country: "Afrique du Sud",
    flag: "🇿🇦",
    currency: "ZAR",
    color: "#A855F7",
    description: "Johannesburg — 1er marché africain",
  },
];

// ── DONNÉES ENTREPRISES PAR MARCHÉ ───────────────────────────────────────────
const ALL_COMPANIES = {
  BRVM: [
    // Banques
    { ticker: "SNTS",  name: "Sonatel",              country: "Sénégal",       sector: "Télécoms",    prix: 18500, variation: -0.5, volume: 8300,  cap: 925, per: 14.2, color: "#F97316" },
    { ticker: "ETIT",  name: "Ecobank CI",            country: "Côte d\'Ivoire", sector: "Banques",     prix: 4200,  variation: 1.2,  volume: 15420, cap: 252, per: 9.8,  color: "#3B82F6" },
    { ticker: "SGBC",  name: "Société Générale CI",   country: "Côte d\'Ivoire", sector: "Banques",     prix: 9800,  variation: 0.8,  volume: 3100,  cap: 196, per: 10.5, color: "#60A5FA" },
    { ticker: "CBIBF", name: "Coris Bank BF",         country: "Burkina Faso",  sector: "Banques",     prix: 8200,  variation: 1.5,  volume: 3400,  cap: 164, per: 8.3,  color: "#0EA5E9" },
    { ticker: "BICC",  name: "BICICI",                country: "Côte d\'Ivoire", sector: "Banques",     prix: 6700,  variation: 2.1,  volume: 4200,  cap: 134, per: 11.2, color: "#38BDF8" },
    { ticker: "BOAB",  name: "BOA Bénin",             country: "Bénin",         sector: "Banques",     prix: 5400,  variation: 0.3,  volume: 1800,  cap: 108, per: 7.9,  color: "#22D3EE" },
    { ticker: "BOAC",  name: "BOA CI",                country: "Côte d\'Ivoire", sector: "Banques",     prix: 5100,  variation: 1.0,  volume: 2100,  cap: 102, per: 8.5,  color: "#2DD4BF" },
    { ticker: "NSBC",  name: "NSIA Banque CI",        country: "Côte d\'Ivoire", sector: "Banques",     prix: 6800,  variation: 1.3,  volume: 2800,  cap: 136, per: 9.1,  color: "#4ADE80" },
    { ticker: "SIBC",  name: "SIB CI",                country: "Côte d\'Ivoire", sector: "Banques",     prix: 4800,  variation: 1.8,  volume: 3100,  cap: 96,  per: 8.7,  color: "#86EFAC" },
    { ticker: "ORGT",  name: "Oragroup Togo",         country: "Togo",          sector: "Banques",     prix: 5300,  variation: -0.8, volume: 1600,  cap: 106, per: 8.2,  color: "#FDE047" },
    { ticker: "BOABF", name: "BOA Burkina Faso",      country: "Burkina Faso",  sector: "Banques",     prix: 4800,  variation: -0.5, volume: 1200,  cap: 96,  per: 7.8,  color: "#FB923C" },
    { ticker: "BOAM",  name: "BOA Mali",              country: "Mali",          sector: "Banques",     prix: 4600,  variation: 0.6,  volume: 950,   cap: 92,  per: 7.5,  color: "#F87171" },
    { ticker: "BOAS",  name: "BOA Sénégal",           country: "Sénégal",       sector: "Banques",     prix: 4900,  variation: 0.9,  volume: 1100,  cap: 98,  per: 8.0,  color: "#C084FC" },
    { ticker: "BOAT",  name: "BOA Togo",              country: "Togo",          sector: "Banques",     prix: 4700,  variation: 0.4,  volume: 890,   cap: 94,  per: 7.6,  color: "#818CF8" },
    { ticker: "BOAN",  name: "BOA Niger",             country: "Niger",         sector: "Banques",     prix: 4300,  variation: -0.2, volume: 780,   cap: 86,  per: 7.3,  color: "#6EE7B7" },
    // Télécoms
    { ticker: "ONECI", name: "Orange CI",             country: "Côte d\'Ivoire", sector: "Télécoms",    prix: 12300, variation: -1.3, volume: 6700,  cap: 615, per: 13.5, color: "#FB923C" },
    // Agriculture
    { ticker: "PALC",  name: "Palm CI",               country: "Côte d\'Ivoire", sector: "Agriculture", prix: 7600,  variation: 0.5,  volume: 2100,  cap: 115, per: 9.2,  color: "#65A30D" },
    { ticker: "SAFC",  name: "SAPH",                  country: "Côte d\'Ivoire", sector: "Agriculture", prix: 5200,  variation: 0.8,  volume: 1200,  cap: 31,  per: 10.1, color: "#4ADE80" },
    { ticker: "SOGC",  name: "SOGB",                  country: "Côte d\'Ivoire", sector: "Agriculture", prix: 3800,  variation: 1.1,  volume: 1500,  cap: 23,  per: 8.9,  color: "#86EFAC" },
    { ticker: "SCRC",  name: "SUCRIVOIRE",            country: "Côte d\'Ivoire", sector: "Agriculture", prix: 2900,  variation: -1.2, volume: 870,   cap: 17,  per: 7.8,  color: "#A3E635" },
    { ticker: "SIAC",  name: "SIAT CI",               country: "Côte d\'Ivoire", sector: "Agriculture", prix: 3600,  variation: 0.4,  volume: 650,   cap: 22,  per: 8.3,  color: "#BEF264" },
    { ticker: "SICC",  name: "SICOR",                 country: "Côte d\'Ivoire", sector: "Agriculture", prix: 4200,  variation: -0.3, volume: 980,   cap: 25,  per: 9.0,  color: "#D9F99D" },
    // Industrie
    { ticker: "SIVC",  name: "Air Liquide CI",        country: "Côte d\'Ivoire", sector: "Industrie",   prix: 3400,  variation: 0.3,  volume: 1200,  cap: 68,  per: 11.0, color: "#A855F7" },
    { ticker: "STAC",  name: "SITAB CI",              country: "Côte d\'Ivoire", sector: "Industrie",   prix: 5800,  variation: 1.6,  volume: 890,   cap: 116, per: 9.5,  color: "#C084FC" },
    { ticker: "UNLC",  name: "UNILEVER CI",           country: "Côte d\'Ivoire", sector: "Industrie",   prix: 6200,  variation: -0.9, volume: 2100,  cap: 124, per: 10.8, color: "#D946EF" },
    { ticker: "SOLC",  name: "SOLIBRA CI",            country: "Côte d\'Ivoire", sector: "Industrie",   prix: 95000, variation: 0.2,  volume: 340,   cap: 285, per: 12.3, color: "#E879F9" },
    { ticker: "NEIC",  name: "NEI-CEDA CI",           country: "Côte d\'Ivoire", sector: "Industrie",   prix: 1850,  variation: -1.0, volume: 560,   cap: 37,  per: 8.2,  color: "#F0ABFC" },
    // Distribution
    { ticker: "CFAC",  name: "CFAO CI",               country: "Côte d\'Ivoire", sector: "Distribution",prix: 8500,  variation: 0.6,  volume: 2300,  cap: 170, per: 11.5, color: "#FCD34D" },
    { ticker: "TTLC",  name: "TotalEnergies CI",      country: "Côte d\'Ivoire", sector: "Énergie",     prix: 1850,  variation: -0.7, volume: 5600,  cap: 37,  per: 9.2,  color: "#FDE68A" },
    { ticker: "TTLS",  name: "TotalEnergies SN",      country: "Sénégal",       sector: "Énergie",     prix: 3100,  variation: 0.5,  volume: 3200,  cap: 42,  per: 8.8,  color: "#FEF3C7" },
    { ticker: "CIEC",  name: "CIE CI",                country: "Côte d\'Ivoire", sector: "Énergie",     prix: 2450,  variation: 0.3,  volume: 4100,  cap: 49,  per: 7.6,  color: "#FCA5A5" },
    // Transport
    { ticker: "AVOC",  name: "Air Côte d\'Ivoire",    country: "Côte d\'Ivoire", sector: "Transport",   prix: 1650,  variation: 2.3,  volume: 4500,  cap: 33,  per: 10.0, color: "#FDBA74" },
    { ticker: "SDSC",  name: "Africa Global Log.",    country: "Côte d\'Ivoire", sector: "Transport",   prix: 1550,  variation: 0.8,  volume: 1200,  cap: 24,  per: 5.4,  color: "#F87171" },
  ],

  NSE: [
    { ticker: "DANGCEM",  name: "Dangote Cement",     country: "Nigeria", sector: "Industrie",   prix: 4250,  variation: 1.8,  volume: 950000,  cap: 7240, per: 11.2, color: "#F97316" },
    { ticker: "MTNN",     name: "MTN Nigeria",        country: "Nigeria", sector: "Télécoms",    prix: 198,   variation: -0.6, volume: 2100000, cap: 4020, per: 13.8, color: "#FCD34D" },
    { ticker: "AIRTELAFRI",name:"Airtel Africa",      country: "Nigeria", sector: "Télécoms",    prix: 1450,  variation: 0.9,  volume: 520000,  cap: 2900, per: 12.1, color: "#FB923C" },
    { ticker: "ZENITHBANK",name:"Zenith Bank",        country: "Nigeria", sector: "Banques",     prix: 36,    variation: 2.3,  volume: 8500000, cap: 1130, per: 3.2,  color: "#3B82F6" },
    { ticker: "GTCO",     name: "Guaranty Trust",    country: "Nigeria", sector: "Banques",     prix: 52,    variation: 1.5,  volume: 6200000, cap: 1540, per: 4.1,  color: "#60A5FA" },
    { ticker: "ACCESSCORP",name:"Access Holdings",   country: "Nigeria", sector: "Banques",     prix: 20,    variation: -0.5, volume: 9800000, cap: 712,  per: 3.8,  color: "#38BDF8" },
    { ticker: "UBA",      name: "United Bank Africa",country: "Nigeria", sector: "Banques",     prix: 24,    variation: 1.2,  volume: 7300000, cap: 820,  per: 3.5,  color: "#22D3EE" },
    { ticker: "NESTLE",   name: "Nestlé Nigeria",    country: "Nigeria", sector: "Conso. Base", prix: 1400,  variation: 0.4,  volume: 180000,  cap: 1110, per: 18.5, color: "#4ADE80" },
    { ticker: "SEPLAT",   name: "Seplat Energy",     country: "Nigeria", sector: "Énergie",     prix: 4100,  variation: 2.1,  volume: 420000,  cap: 2400, per: 7.8,  color: "#EF4444" },
    { ticker: "NB",       name: "Nigerian Breweries",country: "Nigeria", sector: "Conso. Base", prix: 24,    variation: -1.2, volume: 1200000, cap: 380,  per: 14.2, color: "#A855F7" },
    { ticker: "BUACEMENT",name: "BUA Cement",        country: "Nigeria", sector: "Industrie",   prix: 65,    variation: 0.8,  volume: 950000,  cap: 2210, per: 10.3, color: "#D946EF" },
    { ticker: "FIDELITYBK",name:"Fidelity Bank",     country: "Nigeria", sector: "Banques",     prix: 13,    variation: 3.1,  volume: 5600000, cap: 415,  per: 2.9,  color: "#818CF8" },
    { ticker: "STANBIC",  name: "Stanbic IBTC",      country: "Nigeria", sector: "Banques",     prix: 62,    variation: 0.7,  volume: 840000,  cap: 695,  per: 5.6,  color: "#6EE7B7" },
    { ticker: "OKOMUOIL", name: "Okomu Oil Palm",    country: "Nigeria", sector: "Agriculture", prix: 370,   variation: 1.4,  volume: 320000,  cap: 350,  per: 8.9,  color: "#65A30D" },
    { ticker: "PRESCO",   name: "Presco Plc",        country: "Nigeria", sector: "Agriculture", prix: 320,   variation: -0.3, volume: 280000,  cap: 320,  per: 9.2,  color: "#86EFAC" },
  ],

  GSE: [
    { ticker: "MTNGH",  name: "MTN Ghana",           country: "Ghana", sector: "Télécoms",    prix: 2.1,   variation: 1.2,  volume: 3200000, cap: 2650, per: 11.8, color: "#FCD34D" },
    { ticker: "TOTAL",  name: "TotalEnergies GH",   country: "Ghana", sector: "Énergie",     prix: 8.4,   variation: 0.6,  volume: 420000,  cap: 380,  per: 9.2,  color: "#EF4444" },
    { ticker: "GCB",    name: "GCB Bank",            country: "Ghana", sector: "Banques",     prix: 5.2,   variation: 2.1,  volume: 1800000, cap: 640,  per: 5.8,  color: "#3B82F6" },
    { ticker: "ECOBANK",name: "Ecobank Ghana",       country: "Ghana", sector: "Banques",     prix: 11.5,  variation: -0.4, volume: 950000,  cap: 1420, per: 6.2,  color: "#60A5FA" },
    { ticker: "SCBGH",  name: "Standard Chartered GH",country:"Ghana", sector: "Banques",     prix: 24.8,  variation: 0.9,  volume: 380000,  cap: 980,  per: 8.4,  color: "#38BDF8" },
    { ticker: "GOIL",   name: "GOIL",                country: "Ghana", sector: "Énergie",     prix: 1.98,  variation: 1.5,  volume: 2100000, cap: 245,  per: 7.3,  color: "#FCA5A5" },
    { ticker: "AYRTN",  name: "Ayrton Drugs",        country: "Ghana", sector: "Santé",       prix: 0.42,  variation: -0.8, volume: 880000,  cap: 52,   per: 12.1, color: "#10B981" },
    { ticker: "CAL",    name: "CAL Bank",            country: "Ghana", sector: "Banques",     prix: 0.75,  variation: 3.2,  volume: 4200000, cap: 93,   per: 4.2,  color: "#22D3EE" },
    { ticker: "UNIL",   name: "Unilever Ghana",      country: "Ghana", sector: "Conso. Base", prix: 14.2,  variation: 0.3,  volume: 180000,  cap: 175,  per: 16.8, color: "#A855F7" },
    { ticker: "BOPP",   name: "Benso Oil Palm",      country: "Ghana", sector: "Agriculture", prix: 9.8,   variation: 1.1,  volume: 210000,  cap: 121,  per: 10.2, color: "#65A30D" },
  ],

  NSE_KE: [
    { ticker: "EQTY",   name: "Equity Group",        country: "Kenya", sector: "Banques",     prix: 42,    variation: 1.8,  volume: 3200000, cap: 1610, per: 6.8,  color: "#EF4444" },
    { ticker: "KCB",    name: "KCB Group",           country: "Kenya", sector: "Banques",     prix: 38,    variation: -0.4, volume: 2800000, cap: 1220, per: 5.9,  color: "#3B82F6" },
    { ticker: "SCOM",   name: "Safaricom",           country: "Kenya", sector: "Télécoms",    prix: 18,    variation: 0.6,  volume: 8900000, cap: 7200, per: 14.5, color: "#22C55E" },
    { ticker: "BATK",   name: "BAT Kenya",           country: "Kenya", sector: "Conso. Base", prix: 410,   variation: 0.2,  volume: 85000,   cap: 1640, per: 11.2, color: "#D97706" },
    { ticker: "EABL",   name: "E.Africa Breweries",  country: "Kenya", sector: "Conso. Base", prix: 148,   variation: -1.2, volume: 380000,  cap: 1180, per: 15.8, color: "#A855F7" },
    { ticker: "ABSA",   name: "ABSA Kenya",          country: "Kenya", sector: "Banques",     prix: 13,    variation: 2.4,  volume: 1900000, cap: 707,  per: 6.1,  color: "#60A5FA" },
    { ticker: "COOP",   name: "Co-op Bank Kenya",    country: "Kenya", sector: "Banques",     prix: 14,    variation: 0.8,  volume: 2100000, cap: 820,  per: 5.5,  color: "#38BDF8" },
    { ticker: "NCBA",   name: "NCBA Group",          country: "Kenya", sector: "Banques",     prix: 43,    variation: 1.3,  volume: 980000,  cap: 695,  per: 5.2,  color: "#22D3EE" },
    { ticker: "STANCHART",name:"Standard Chartered KE",country:"Kenya",sector: "Banques",     prix: 175,   variation: -0.6, volume: 210000,  cap: 658,  per: 7.8,  color: "#4ADE80" },
    { ticker: "KENGEN", name: "KenGen",              country: "Kenya", sector: "Énergie",     prix: 3.9,   variation: 1.0,  volume: 3600000, cap: 316,  per: 8.4,  color: "#FCA5A5" },
    { ticker: "KPLC",   name: "Kenya Power",         country: "Kenya", sector: "Énergie",     prix: 2.1,   variation: -2.1, volume: 5200000, cap: 170,  per: 6.2,  color: "#FB923C" },
    { ticker: "CARB",   name: "Carbacid Invest.",    country: "Kenya", sector: "Industrie",   prix: 12,    variation: 0.5,  volume: 420000,  cap: 141,  per: 9.8,  color: "#C084FC" },
  ],

  JSE: [
    { ticker: "NPN",    name: "Naspers",             country: "Afrique du Sud", sector: "Tech",        prix: 3520,  variation: 0.8,  volume: 1850000, cap: 140000, per: 22.5, color: "#A855F7" },
    { ticker: "BHP",    name: "BHP Group",           country: "Afrique du Sud", sector: "Mines",       prix: 4680,  variation: -0.4, volume: 2100000, cap: 118000, per: 14.8, color: "#78716C" },
    { ticker: "AGL",    name: "Anglo American",      country: "Afrique du Sud", sector: "Mines",       prix: 5820,  variation: 1.2,  volume: 1620000, cap: 78000,  per: 16.2, color: "#A8A29E" },
    { ticker: "SOL",    name: "Sasol",               country: "Afrique du Sud", sector: "Énergie",     prix: 1420,  variation: -1.8, volume: 3200000, cap: 22800,  per: 8.5,  color: "#EF4444" },
    { ticker: "MTN",    name: "MTN Group",           country: "Afrique du Sud", sector: "Télécoms",    prix: 108,   variation: 2.1,  volume: 5800000, cap: 19800,  per: 9.8,  color: "#FCD34D" },
    { ticker: "FSR",    name: "FirstRand",           country: "Afrique du Sud", sector: "Banques",     prix: 78,    variation: 0.9,  volume: 4200000, cap: 43500,  per: 10.2, color: "#3B82F6" },
    { ticker: "SBK",    name: "Standard Bank",       country: "Afrique du Sud", sector: "Banques",     prix: 210,   variation: 1.4,  volume: 2800000, cap: 33600,  per: 9.6,  color: "#60A5FA" },
    { ticker: "ABG",    name: "Absa Group",          country: "Afrique du Sud", sector: "Banques",     prix: 185,   variation: -0.3, volume: 1900000, cap: 24200,  per: 8.8,  color: "#38BDF8" },
    { ticker: "NED",    name: "Nedbank",             country: "Afrique du Sud", sector: "Banques",     prix: 268,   variation: 0.6,  volume: 1400000, cap: 13400,  per: 8.1,  color: "#22D3EE" },
    { ticker: "TFG",    name: "The Foschini Group",  country: "Afrique du Sud", sector: "Distribution",prix: 128,   variation: 1.7,  volume: 980000,  cap: 15600,  per: 11.4, color: "#F97316" },
    { ticker: "WHL",    name: "Woolworths",          country: "Afrique du Sud", sector: "Distribution",prix: 72,    variation: 0.3,  volume: 2100000, cap: 10800,  per: 13.2, color: "#FBBF24" },
    { ticker: "SHP",    name: "Shoprite",            country: "Afrique du Sud", sector: "Distribution",prix: 248,   variation: 0.7,  volume: 1600000, cap: 40800,  per: 15.8, color: "#FDE68A" },
    { ticker: "VOD",    name: "Vodacom",             country: "Afrique du Sud", sector: "Télécoms",    prix: 112,   variation: -0.8, volume: 2400000, cap: 30200,  per: 12.4, color: "#FB923C" },
    { ticker: "AMS",    name: "Anglo Platinum",      country: "Afrique du Sud", sector: "Mines",       prix: 8420,  variation: 2.4,  volume: 420000,  cap: 24600,  per: 9.2,  color: "#D1D5DB" },
    { ticker: "IMP",    name: "Impala Platinum",     country: "Afrique du Sud", sector: "Mines",       prix: 1380,  variation: -1.5, volume: 3800000, cap: 17500,  per: 8.6,  color: "#9CA3AF" },
    { ticker: "GFI",    name: "Gold Fields",         country: "Afrique du Sud", sector: "Mines",       prix: 2480,  variation: 1.9,  volume: 2100000, cap: 34200,  per: 12.8, color: "#FCD34D" },
  ],
};

// ── SIGNAL ────────────────────────────────────────────────────────────────────
function getSignal(variation, per) {
  const score = (variation > 2 ? 90 : variation > 0.5 ? 75 : variation > 0 ? 60 : variation > -1 ? 45 : 30)
    + (per < 8 ? 10 : per < 12 ? 5 : 0);
  if (score >= 85) return { label: "ACHAT FORT", color: "#22C55E" };
  if (score >= 70) return { label: "ACHAT",      color: "#84CC16" };
  if (score >= 55) return { label: "CONSERVER",  color: "#D4A843" };
  if (score >= 40) return { label: "ALLÉGER",    color: "#F97316" };
  return              { label: "VENDRE",         color: "#EF4444" };
}

// ── FORMAT CAP ────────────────────────────────────────────────────────────────
function fmtCap(v) {
  if (v >= 1000) return (v / 1000).toFixed(1) + " T";
  return v + " Mds";
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function BRVMDashboard() {
  const [market,     setMarket]     = useState("BRVM");
  const [search,     setSearch]     = useState("");
  const [sector,     setSector]     = useState("Tous");
  const [country,    setCountry]    = useState("Tous");
  const [sortBy,     setSortBy]     = useState("cap");
  const [sortDir,    setSortDir]    = useState("desc");
  const [menuOpen,   setMenuOpen]   = useState(false);

  const companies = ALL_COMPANIES[market] || [];
  const currentMarket = MARKETS.find(m => m.id === market);

  const sectors  = ["Tous", ...Array.from(new Set(companies.map(c => c.sector))).sort()];
  const countries = ["Tous", ...Array.from(new Set(companies.map(c => c.country))).sort()];

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const filtered = companies
    .filter(c =>
      (sector  === "Tous" || c.sector  === sector)  &&
      (country === "Tous" || c.country === country) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
       c.ticker.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const v = sortDir === "desc" ? -1 : 1;
      if (sortBy === "prix")      return v * (a.prix      - b.prix);
      if (sortBy === "variation") return v * (a.variation - b.variation);
      if (sortBy === "volume")    return v * (a.volume    - b.volume);
      if (sortBy === "cap")       return v * (a.cap       - b.cap);
      return 0;
    });

  const totalCap   = companies.reduce((a, b) => a + b.cap, 0);
  const hausse     = companies.filter(c => c.variation > 0).length;
  const baisse     = companies.filter(c => c.variation < 0).length;
  const avgVar     = (companies.reduce((a,b)=>a+b.variation,0)/companies.length).toFixed(2);

  const SortTh = ({ col, label }) => (
    <th onClick={() => handleSort(col)} style={{
      padding: "10px 12px", textAlign: "right", color: sortBy === col ? C.gold : C.textDim,
      fontSize: "0.68rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
      textTransform: "uppercase", letterSpacing: "0.08em", userSelect: "none",
    }}>
      {label} {sortBy === col ? (sortDir === "desc" ? "↓" : "↑") : "↕"}
    </th>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Trebuchet MS', Georgia, serif" }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: C.panel, borderBottom: `1px solid ${C.border}`,
        padding: "12px 16px", display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      }}>
        <div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: C.gold, textTransform: "uppercase" }}>
            Marchés Financiers Africains
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>
            AMARA Invest
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: "0.7rem", color: C.textDim }}>
            {new Date().toLocaleDateString("fr-FR", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
          <span style={{ fontSize: "0.65rem", color: C.green }}>Ouvert</span>
        </div>
      </div>

      {/* ── SÉLECTEUR DE MARCHÉS ── */}
      <div style={{ background: "#0A0F1A", borderBottom: `1px solid ${C.border}`, padding: "10px 16px" }}>
        <div style={{ fontSize: "0.6rem", color: C.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Sélectionner un marché
        </div>
        {/* Desktop : boutons horizontaux */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {MARKETS.map(m => (
            <button key={m.id} onClick={() => { setMarket(m.id); setSector("Tous"); setCountry("Tous"); setSearch(""); }}
              style={{
                padding: "8px 14px", borderRadius: 6, border: `1px solid ${market === m.id ? m.color : C.border}`,
                background: market === m.id ? `${m.color}20` : "transparent",
                color: market === m.id ? m.color : C.silver,
                cursor: "pointer", fontSize: "0.72rem", fontWeight: market === m.id ? 700 : 400,
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 5,
              }}>
              <span style={{ fontSize: "1rem" }}>{m.flag}</span>
              <span>{m.name}</span>
              {market === m.id && (
                <span style={{
                  background: m.color, color: "#000", borderRadius: 3,
                  padding: "1px 5px", fontSize: "0.58rem", fontWeight: 800, marginLeft: 2
                }}>
                  {ALL_COMPANIES[m.id]?.length}
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Info marché actif */}
        {currentMarket && (
          <div style={{ marginTop: 8, fontSize: "0.65rem", color: C.textDim }}>
            <span style={{ color: currentMarket.color, fontWeight: 700 }}>{currentMarket.fullName}</span>
            {"  ·  "}{currentMarket.description}
            {"  ·  Devise : "}
            <span style={{ color: C.gold }}>{currentMarket.currency}</span>
          </div>
        )}
      </div>

      {/* ── KPIs ── */}
      <div style={{ display: "flex", gap: 10, padding: "12px 16px", flexWrap: "wrap", borderBottom: `1px solid ${C.border}` }}>
        {[
          { l: "Sociétés",      v: companies.length.toString(),   c: C.blue  },
          { l: "Cap. totale",   v: fmtCap(totalCap) + " FCFA",    c: C.gold  },
          { l: "En hausse ▲",   v: hausse.toString(),             c: C.green },
          { l: "En baisse ▼",   v: baisse.toString(),             c: C.red   },
          { l: "Var. moyenne",  v: `${avgVar > 0 ? "+" : ""}${avgVar}%`, c: parseFloat(avgVar) >= 0 ? C.green : C.red },
          { l: "Résultats",     v: filtered.length.toString(),    c: C.teal  },
        ].map((k, i) => (
          <div key={i} style={{
            background: C.panel, border: `1px solid ${C.border}`, borderLeft: `3px solid ${k.c}`,
            borderRadius: 6, padding: "8px 12px", flex: "1 1 100px", minWidth: 90,
          }}>
            <div style={{ fontSize: "0.58rem", color: C.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{k.l}</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* ── FILTRES ── */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Recherche */}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher ticker ou société..."
          style={{
            background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
            color: C.text, padding: "8px 12px", fontSize: "0.8rem", width: "100%",
            boxSizing: "border-box", outline: "none",
          }}
        />

        {/* Secteur */}
        <div>
          <div style={{ fontSize: "0.6rem", color: C.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Secteur</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {sectors.map(s => (
              <button key={s} onClick={() => setSector(s)} style={{
                padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: "0.7rem",
                background: sector === s ? (SECTOR_COLORS[s] || C.gold) : C.panel,
                color: "white", fontWeight: sector === s ? 700 : 400,
                borderLeft: sector !== s && SECTOR_COLORS[s] ? `3px solid ${SECTOR_COLORS[s]}` : "none",
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Pays */}
        {countries.length > 2 && (
          <div>
            <div style={{ fontSize: "0.6rem", color: C.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pays</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {countries.map(p => (
                <button key={p} onClick={() => setCountry(p)} style={{
                  padding: "5px 12px", borderRadius: 20, border: `1px solid ${country === p ? C.purple : C.border}`,
                  cursor: "pointer", fontSize: "0.7rem",
                  background: country === p ? `${C.purple}30` : C.panel,
                  color: country === p ? C.purple : C.silver, fontWeight: country === p ? 700 : 400,
                }}>
                  {FLAGS[p] || ""} {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        {(search || sector !== "Tous" || country !== "Tous") && (
          <button onClick={() => { setSearch(""); setSector("Tous"); setCountry("Tous"); }}
            style={{
              alignSelf: "flex-start", padding: "6px 14px", borderRadius: 6,
              border: `1px solid ${C.border}`, background: "transparent",
              color: C.textDim, cursor: "pointer", fontSize: "0.7rem",
            }}>
            ✕ Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* ── TABLEAU ── */}
      <div style={{ overflowX: "auto", padding: "0 0 60px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr style={{ background: "#0A0F1A", position: "sticky", top: 0, zIndex: 10 }}>
              <th style={{ padding: "10px 16px", textAlign: "left", color: C.textDim, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Ticker</th>
              <th style={{ padding: "10px 12px", textAlign: "left", color: C.textDim, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Société</th>
              <th style={{ padding: "10px 12px", textAlign: "left", color: C.textDim, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Secteur</th>
              <SortTh col="prix"      label="Prix" />
              <SortTh col="variation" label="Var. %" />
              <SortTh col="volume"    label="Volume" />
              <SortTh col="cap"       label="Cap. Mds" />
              <th style={{ padding: "10px 12px", textAlign: "center", color: C.textDim, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Signal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const sig = getSignal(c.variation, c.per);
              return (
                <tr key={c.ticker}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    background: i % 2 === 0 ? "#0A0F1A" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1C2333"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#0A0F1A" : "transparent"}
                >
                  <td style={{ padding: "11px 16px" }}>
                    <span style={{
                      color: c.color, fontWeight: 800, fontSize: "0.78rem",
                      background: `${c.color}18`, padding: "2px 7px", borderRadius: 4,
                    }}>{c.ticker}</span>
                  </td>
                  <td style={{ padding: "11px 12px" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: C.text }}>{c.name}</div>
                    <div style={{ fontSize: "0.62rem", color: C.textDim, marginTop: 1 }}>
                      {FLAGS[c.country] || ""} {c.country}
                    </div>
                  </td>
                  <td style={{ padding: "11px 12px" }}>
                    <span style={{
                      background: `${SECTOR_COLORS[c.sector] || C.border}25`,
                      color: SECTOR_COLORS[c.sector] || C.silver,
                      border: `1px solid ${SECTOR_COLORS[c.sector] || C.border}50`,
                      padding: "3px 9px", borderRadius: 12, fontSize: "0.65rem", fontWeight: 600,
                    }}>{c.sector}</span>
                  </td>
                  <td style={{ padding: "11px 12px", textAlign: "right", fontWeight: 700, fontSize: "0.78rem", color: C.text, fontVariantNumeric: "tabular-nums" }}>
                    {c.prix.toLocaleString("fr-FR")}
                  </td>
                  <td style={{ padding: "11px 12px", textAlign: "right", fontWeight: 700, fontSize: "0.78rem", color: c.variation > 0 ? C.green : c.variation < 0 ? C.red : C.textDim }}>
                    {c.variation > 0 ? "▲" : c.variation < 0 ? "▼" : "—"} {Math.abs(c.variation)}%
                  </td>
                  <td style={{ padding: "11px 12px", textAlign: "right", fontSize: "0.72rem", color: C.silver, fontVariantNumeric: "tabular-nums" }}>
                    {c.volume.toLocaleString("fr-FR")}
                  </td>
                  <td style={{ padding: "11px 12px", textAlign: "right", fontSize: "0.72rem", color: C.gold, fontVariantNumeric: "tabular-nums" }}>
                    {fmtCap(c.cap)}
                  </td>
                  <td style={{ padding: "11px 12px", textAlign: "center" }}>
                    <span style={{
                      background: `${sig.color}22`, color: sig.color,
                      border: `1px solid ${sig.color}55`,
                      padding: "3px 8px", borderRadius: 4, fontSize: "0.6rem", fontWeight: 800,
                      letterSpacing: "0.04em", whiteSpace: "nowrap",
                    }}>{sig.label}</span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "40px", textAlign: "center", color: C.textDim, fontSize: "0.8rem" }}>
                  Aucun résultat pour ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        textAlign: "center", padding: "10px 20px", fontSize: "0.58rem",
        color: C.textDim, borderTop: `1px solid ${C.border}`, background: C.panel,
        position: "fixed", bottom: 0, left: 0, right: 0,
      }}>
        Sources : BRVM · NSE Nigeria · GSE Ghana · NSE Kenya · JSE — ⚠️ Analyse informative uniquement. Non un conseil en investissement.
      </div>

    </div>
  );
}
