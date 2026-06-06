
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

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface Company {
  ticker: string; name: string; country: string; sector: string;
  flag: string; price: number; variation: number; volume: number;
  mktcap: number; per: number; color: string; currency: string;
}

interface Market {
  id: string; name: string; fullName: string; flag: string;
  color: string; currency: string; region: string;
  companies: Company[];
}

// ── MARKET DATA ───────────────────────────────────────────────────────────────
const MARKETS: Market[] = [
  {
    id: "BRVM", name: "BRVM", fullName: "Bourse Régionale des Valeurs Mobilières",
    flag: "🌍", color: "#D4A843", currency: "FCFA", region: "Afrique de l'Ouest",
    companies: [
      { ticker:"SNTS", name:"Sonatel", country:"Sénégal", sector:"Télécoms", flag:"🇸🇳", price:18500, variation:1.2, volume:8300, mktcap:1295, per:14.2, color:"#D4A843", currency:"FCFA" },
      { ticker:"ETIT", name:"Ecobank CI", country:"Côte d'Ivoire", sector:"Banques", flag:"🇨🇮", price:4200, variation:0.8, volume:15420, mktcap:252, per:9.1, color:"#3B82F6", currency:"FCFA" },
      { ticker:"SGBC", name:"Société Générale CI", country:"Côte d'Ivoire", sector:"Banques", flag:"🇨🇮", price:9800, variation:2.1, volume:3100, mktcap:196, per:10.5, color:"#22C55E", currency:"FCFA" },
      { ticker:"BICC", name:"BICICI", country:"Côte d'Ivoire", sector:"Banques", flag:"🇨🇮", price:6700, variation:-0.5, volume:4200, mktcap:134, per:8.7, color:"#A855F7", currency:"FCFA" },
      { ticker:"CBIBF", name:"Coris Bank BF", country:"Burkina Faso", sector:"Banques", flag:"🇧🇫", price:8200, variation:1.5, volume:2100, mktcap:164, per:11.2, color:"#14B8A6", currency:"FCFA" },
      { ticker:"BOAB", name:"BOA Bénin", country:"Bénin", sector:"Banques", flag:"🇧🇯", price:5400, variation:0.3, volume:1800, mktcap:108, per:9.8, color:"#F97316", currency:"FCFA" },
      { ticker:"BOAS", name:"BOA Sénégal", country:"Sénégal", sector:"Banques", flag:"🇸🇳", price:7500, variation:-1.2, volume:1200, mktcap:85, per:10.3, color:"#34D399", currency:"FCFA" },
      { ticker:"PALC", name:"Palm CI", country:"Côte d'Ivoire", sector:"Agriculture", flag:"🇨🇮", price:7600, variation:0.5, volume:2100, mktcap:456, per:12.1, color:"#FB923C", currency:"FCFA" },
      { ticker:"SAFC", name:"SAPH", country:"Côte d'Ivoire", sector:"Agriculture", flag:"🇨🇮", price:5200, variation:0.8, volume:1200, mktcap:312, per:11.8, color:"#FBBF24", currency:"FCFA" },
      { ticker:"SIVC", name:"Air Liquide CI", country:"Côte d'Ivoire", sector:"Industrie", flag:"🇨🇮", price:3400, variation:0.3, volume:1200, mktcap:204, per:13.5, color:"#60A5FA", currency:"FCFA" },
      { ticker:"ONECI", name:"Orange CI", country:"Côte d'Ivoire", sector:"Télécoms", flag:"🇨🇮", price:12300, variation:-1.3, volume:6700, mktcap:738, per:15.2, color:"#F97316", currency:"FCFA" },
      { ticker:"NTLC", name:"Nestlé CI", country:"Côte d'Ivoire", sector:"Conso. Base", flag:"🇨🇮", price:13000, variation:0.6, volume:3200, mktcap:165, per:11.5, color:"#A78BFA", currency:"FCFA" },
      { ticker:"TTLC", name:"Total CI", country:"Côte d'Ivoire", sector:"Énergie", flag:"🇨🇮", price:2200, variation:-0.8, volume:5400, mktcap:132, per:8.9, color:"#EF4444", currency:"FCFA" },
      { ticker:"SCRC", name:"SUCRIVOIRE", country:"Côte d'Ivoire", sector:"Agriculture", flag:"🇨🇮", price:2900, variation:-1.2, volume:870, mktcap:174, per:9.2, color:"#10B981", currency:"FCFA" },
      { ticker:"SOGC", name:"SOGB", country:"Côte d'Ivoire", sector:"Agriculture", flag:"🇨🇮", price:3800, variation:1.1, volume:1500, mktcap:228, per:10.4, color:"#6EE7B7", currency:"FCFA" },
      { ticker:"STAC", name:"SETAO CI", country:"Côte d'Ivoire", sector:"Industrie", flag:"🇨🇮", price:1800, variation:0.2, volume:620, mktcap:54, per:7.8, color:"#93C5FD", currency:"FCFA" },
    ]
  },
  {
    id: "NSE_NG", name: "NGX", fullName: "Nigerian Exchange Group",
    flag: "🇳🇬", color: "#22C55E", currency: "NGN", region: "Afrique de l'Ouest",
    companies: [
      { ticker:"DANGCEM", name:"Dangote Cement", country:"Nigeria", sector:"Industrie", flag:"🇳🇬", price:389, variation:2.3, volume:4200000, mktcap:6630, per:12.1, color:"#22C55E", currency:"NGN" },
      { ticker:"MTNN", name:"MTN Nigeria", country:"Nigeria", sector:"Télécoms", flag:"🇳🇬", price:198, variation:-1.1, volume:3100000, mktcap:4034, per:14.8, color:"#F59E0B", currency:"NGN" },
      { ticker:"AIRTELAFRI", name:"Airtel Africa", country:"Nigeria", sector:"Télécoms", flag:"🇳🇬", price:1480, variation:0.9, volume:890000, mktcap:5520, per:11.2, color:"#EF4444", currency:"NGN" },
      { ticker:"GTCO", name:"Guaranty Trust", country:"Nigeria", sector:"Banques", flag:"🇳🇬", price:45, variation:1.8, volume:12000000, mktcap:1327, per:4.2, color:"#F97316", currency:"NGN" },
      { ticker:"ZENITH", name:"Zenith Bank", country:"Nigeria", sector:"Banques", flag:"🇳🇬", price:38, variation:0.5, volume:8900000, mktcap:1193, per:3.8, color:"#3B82F6", currency:"NGN" },
      { ticker:"ACCESS", name:"Access Holdings", country:"Nigeria", sector:"Banques", flag:"🇳🇬", price:19, variation:-0.3, volume:15000000, mktcap:681, per:3.1, color:"#A855F7", currency:"NGN" },
      { ticker:"UBA", name:"United Bank Africa", country:"Nigeria", sector:"Banques", flag:"🇳🇬", price:22, variation:1.2, volume:9800000, mktcap:751, per:3.5, color:"#14B8A6", currency:"NGN" },
      { ticker:"NESTLE_NG", name:"Nestlé Nigeria", country:"Nigeria", sector:"Conso. Base", flag:"🇳🇬", price:780, variation:-0.8, volume:210000, mktcap:621, per:18.2, color:"#FB923C", currency:"NGN" },
      { ticker:"NB", name:"Nigerian Breweries", country:"Nigeria", sector:"Conso. Base", flag:"🇳🇬", price:28, variation:0.4, volume:1200000, mktcap:222, per:9.4, color:"#34D399", currency:"NGN" },
      { ticker:"SEPLAT", name:"Seplat Energy", country:"Nigeria", sector:"Énergie", flag:"🇳🇬", price:3820, variation:3.1, volume:180000, mktcap:2163, per:8.7, color:"#FBBF24", currency:"NGN" },
      { ticker:"OKOMU", name:"Okomu Oil Palm", country:"Nigeria", sector:"Agriculture", flag:"🇳🇬", price:348, variation:1.5, volume:320000, mktcap:332, per:10.2, color:"#6EE7B7", currency:"NGN" },
      { ticker:"BUAFOODS", name:"BUA Foods", country:"Nigeria", sector:"Conso. Base", flag:"🇳🇬", price:430, variation:2.1, volume:1500000, mktcap:5160, per:22.3, color:"#C4B5FD", currency:"NGN" },
    ]
  },
  {
    id: "GSE", name: "GSE", fullName: "Ghana Stock Exchange",
    flag: "🇬🇭", color: "#EF4444", currency: "GHS", region: "Afrique de l'Ouest",
    companies: [
      { ticker:"MTNGH", name:"MTN Ghana", country:"Ghana", sector:"Télécoms", flag:"🇬🇭", price:3.8, variation:1.8, volume:2100000, mktcap:19200, per:13.2, color:"#F59E0B", currency:"GHS" },
      { ticker:"GCB", name:"GCB Bank", country:"Ghana", sector:"Banques", flag:"🇬🇭", price:5.2, variation:0.6, volume:890000, mktcap:1248, per:4.8, color:"#22C55E", currency:"GHS" },
      { ticker:"EGH", name:"Ecobank Ghana", country:"Ghana", sector:"Banques", flag:"🇬🇭", price:9.8, variation:-0.4, volume:450000, mktcap:1176, per:5.2, color:"#3B82F6", currency:"GHS" },
      { ticker:"GOIL", name:"GOIL Company", country:"Ghana", sector:"Énergie", flag:"🇬🇭", price:2.1, variation:1.1, volume:680000, mktcap:504, per:11.4, color:"#EF4444", currency:"GHS" },
      { ticker:"TOTAL_GH", name:"TotalEnergies GH", country:"Ghana", sector:"Énergie", flag:"🇬🇭", price:4.5, variation:-1.2, volume:320000, mktcap:450, per:9.8, color:"#F97316", currency:"GHS" },
      { ticker:"GGBL", name:"Guinness Ghana", country:"Ghana", sector:"Conso. Base", flag:"🇬🇭", price:1.8, variation:0.3, volume:540000, mktcap:216, per:14.1, color:"#A855F7", currency:"GHS" },
      { ticker:"CLYD", name:"Clydestone Ghana", country:"Ghana", sector:"Tech.", flag:"🇬🇭", price:0.08, variation:2.5, volume:1200000, mktcap:38, per:16.2, color:"#14B8A6", currency:"GHS" },
      { ticker:"SCB_GH", name:"Standard Chartered GH", country:"Ghana", sector:"Banques", flag:"🇬🇭", price:18.5, variation:0.9, volume:210000, mktcap:4810, per:8.1, color:"#60A5FA", currency:"GHS" },
      { ticker:"ACCESS_GH", name:"Access Bank Ghana", country:"Ghana", sector:"Banques", flag:"🇬🇭", price:3.4, variation:-0.6, volume:380000, mktcap:476, per:5.9, color:"#34D399", currency:"GHS" },
      { ticker:"SOGEGH", name:"SociéGé Ghana", country:"Ghana", sector:"Banques", flag:"🇬🇭", price:0.95, variation:0.0, volume:920000, mktcap:247, per:6.3, color:"#FBBF24", currency:"GHS" },
    ]
  },
  {
    id: "NSE_KE", name: "NSE KE", fullName: "Nairobi Securities Exchange",
    flag: "🇰🇪", color: "#14B8A6", currency: "KES", region: "Afrique de l'Est",
    companies: [
      { ticker:"SCOM", name:"Safaricom", country:"Kenya", sector:"Télécoms", flag:"🇰🇪", price:18.5, variation:1.4, volume:12000000, mktcap:73908, per:16.8, color:"#22C55E", currency:"KES" },
      { ticker:"EQTY", name:"Equity Group", country:"Kenya", sector:"Banques", flag:"🇰🇪", price:48.5, variation:0.8, volume:3200000, mktcap:18436, per:6.2, color:"#3B82F6", currency:"KES" },
      { ticker:"KCB", name:"KCB Group", country:"Kenya", sector:"Banques", flag:"🇰🇪", price:42.0, variation:-0.5, volume:2800000, mktcap:13482, per:5.8, color:"#A855F7", currency:"KES" },
      { ticker:"COOP", name:"Co-op Bank", country:"Kenya", sector:"Banques", flag:"🇰🇪", price:15.2, variation:0.7, volume:1900000, mktcap:8921, per:5.1, color:"#14B8A6", currency:"KES" },
      { ticker:"EABL", name:"East African Breweries", country:"Kenya", sector:"Conso. Base", flag:"🇰🇪", price:130, variation:-1.8, volume:480000, mktcap:10296, per:19.4, color:"#F59E0B", currency:"KES" },
      { ticker:"BAT_KE", name:"BAT Kenya", country:"Kenya", sector:"Conso. Base", flag:"🇰🇪", price:380, variation:0.5, volume:85000, mktcap:3002, per:7.8, color:"#EF4444", currency:"KES" },
      { ticker:"KPLC", name:"Kenya Power", country:"Kenya", sector:"Énergie", flag:"🇰🇪", price:3.4, variation:2.9, volume:4500000, mktcap:1091, per:8.2, color:"#F97316", currency:"KES" },
      { ticker:"NATION", name:"Nation Media Group", country:"Kenya", sector:"Médias", flag:"🇰🇪", price:22.0, variation:-0.9, volume:280000, mktcap:1738, per:11.3, color:"#FB923C", currency:"KES" },
      { ticker:"CARB", name:"Carbacid", country:"Kenya", sector:"Industrie", flag:"🇰🇪", price:13.5, variation:1.1, volume:320000, mktcap:1067, per:12.1, color:"#34D399", currency:"KES" },
      { ticker:"JUBILEE", name:"Jubilee Holdings", country:"Kenya", sector:"Assurances", flag:"🇰🇪", price:248, variation:0.4, volume:145000, mktcap:3822, per:9.4, color:"#FBBF24", currency:"KES" },
      { ticker:"ABSA_KE", name:"Absa Kenya", country:"Kenya", sector:"Banques", flag:"🇰🇪", price:14.8, variation:-0.3, volume:1200000, mktcap:7982, per:6.8, color:"#60A5FA", currency:"KES" },
    ]
  },
  {
    id: "JSE", name: "JSE", fullName: "Johannesburg Stock Exchange",
    flag: "🇿🇦", color: "#A855F7", currency: "ZAR", region: "Afrique du Sud",
    companies: [
      { ticker:"NPN", name:"Naspers", country:"Afrique du Sud", sector:"Tech.", flag:"🇿🇦", price:2850, variation:1.9, volume:890000, mktcap:1212000, per:24.1, color:"#A855F7", currency:"ZAR" },
      { ticker:"PRX", name:"Prosus", country:"Afrique du Sud", sector:"Tech.", flag:"🇿🇦", price:890, variation:2.2, volume:1200000, mktcap:1485000, per:22.8, color:"#3B82F6", currency:"ZAR" },
      { ticker:"BHG", name:"BHP Group", country:"Afrique du Sud", sector:"Mines", flag:"🇿🇦", price:470, variation:-0.6, volume:2100000, mktcap:2376000, per:12.4, color:"#EF4444", currency:"ZAR" },
      { ticker:"AGL", name:"Anglo American", country:"Afrique du Sud", sector:"Mines", flag:"🇿🇦", price:520, variation:1.1, volume:1800000, mktcap:702000, per:10.8, color:"#D4A843", currency:"ZAR" },
      { ticker:"SBK", name:"Standard Bank", country:"Afrique du Sud", sector:"Banques", flag:"🇿🇦", price:215, variation:0.7, volume:3200000, mktcap:338000, per:9.2, color:"#22C55E", currency:"ZAR" },
      { ticker:"FSR", name:"FirstRand", country:"Afrique du Sud", sector:"Banques", flag:"🇿🇦", price:78, variation:0.3, volume:4500000, mktcap:426000, per:11.1, color:"#14B8A6", currency:"ZAR" },
      { ticker:"MTN", name:"MTN Group", country:"Afrique du Sud", sector:"Télécoms", flag:"🇿🇦", price:82, variation:-1.4, volume:5800000, mktcap:150000, per:8.3, color:"#F59E0B", currency:"ZAR" },
      { ticker:"VOD_ZA", name:"Vodacom", country:"Afrique du Sud", sector:"Télécoms", flag:"🇿🇦", price:110, variation:0.9, volume:2100000, mktcap:200000, per:13.6, color:"#EF4444", currency:"ZAR" },
      { ticker:"SOL", name:"Sasol", country:"Afrique du Sud", sector:"Énergie", flag:"🇿🇦", price:165, variation:2.8, volume:3800000, mktcap:101000, per:7.4, color:"#F97316", currency:"ZAR" },
      { ticker:"AMS", name:"Anglo Platinum", country:"Afrique du Sud", sector:"Mines", flag:"🇿🇦", price:680, variation:-0.8, volume:480000, mktcap:184000, per:9.8, color:"#A78BFA", currency:"ZAR" },
      { ticker:"GFI", name:"Gold Fields", country:"Afrique du Sud", sector:"Mines", flag:"🇿🇦", price:285, variation:3.2, volume:2800000, mktcap:79000, per:16.2, color:"#FBBF24", currency:"ZAR" },
      { ticker:"CPI", name:"Capitec Bank", country:"Afrique du Sud", sector:"Banques", flag:"🇿🇦", price:2700, variation:1.5, volume:320000, mktcap:319000, per:21.4, color:"#34D399", currency:"ZAR" },
    ]
  }
];

// ── SIGNAL CALCULATION ────────────────────────────────────────────────────────
function getSignal(per: number, variation: number): { label: string; color: string } {
  const score =
    (variation > 2 ? 30 : variation > 0 ? 20 : variation > -1 ? 10 : 0) +
    (per < 8 ? 30 : per < 12 ? 20 : per < 16 ? 10 : 5) +
    Math.random() * 20;
  if (score >= 60) return { label: "ACHAT FORT", color: C.green };
  if (score >= 45) return { label: "ACHAT", color: "#84CC16" };
  if (score >= 30) return { label: "CONSERVER", color: C.gold };
  if (score >= 15) return { label: "ALLÉGER", color: "#F97316" };
  return { label: "VENDRE", color: C.red };
}

function formatCap(val: number, currency: string): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K Mds ${currency}`;
  return `${val.toLocaleString("fr-FR")} Mds ${currency}`;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AfricaMarkets() {
  const [activeMarket, setActiveMarket] = useState<string>("BRVM");
  const [sectorFilter, setSectorFilter] = useState<string>("Tous");
  const [countryFilter, setCountryFilter] = useState<string>("Tous");
  const [sortCol, setSortCol] = useState<string>("mktcap");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const market = MARKETS.find(m => m.id === activeMarket)!;

  // Unique sectors & countries for current market
  const sectors = ["Tous", ...Array.from(new Set(market.companies.map(c => c.sector)))];
  const countries = ["Tous", ...Array.from(new Set(market.companies.map(c => c.country)))];
  const showCountryFilter = countries.length > 2;

  // Filter + sort
  const filtered = market.companies
    .filter(c =>
      (sectorFilter === "Tous" || c.sector === sectorFilter) &&
      (countryFilter === "Tous" || c.country === countryFilter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.ticker.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortCol === "price") return mul * (a.price - b.price);
      if (sortCol === "variation") return mul * (a.variation - b.variation);
      if (sortCol === "volume") return mul * (a.volume - b.volume);
      if (sortCol === "mktcap") return mul * (a.mktcap - b.mktcap);
      if (sortCol === "per") return mul * (a.per - b.per);
      return 0;
    });

  const handleSort = (col: string) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else { setSortCol(col); setSortAsc(false); }
  };

  const totalCap = market.companies.reduce((a, b) => a + b.mktcap, 0);
  const rising = market.companies.filter(c => c.variation > 0).length;
  const falling = market.companies.filter(c => c.variation < 0).length;
  const avgVar = (market.companies.reduce((a, b) => a + b.variation, 0) / market.companies.length).toFixed(2);

  const selected = selectedTicker ? market.companies.find(c => c.ticker === selectedTicker) : null;

  const thStyle = (col: string) => ({
    padding: "10px 14px", textAlign: "left" as const,
    color: sortCol === col ? C.gold : C.textDim,
    fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" as const,
    letterSpacing: "0.07em", cursor: "pointer", whiteSpace: "nowrap" as const,
    userSelect: "none" as const,
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Trebuchet MS', Georgia, serif" }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: C.gold, textTransform: "uppercase" }}>Marchés Boursiers Africains</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>
            <span style={{ color: C.gold }}>AMARA</span> Invest
          </div>
        </div>
        <div style={{ fontSize: "0.7rem", color: C.textDim }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* ── MARKET SELECTOR ── */}
      <div style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", gap: 8, flexWrap: "wrap", overflowX: "auto" }}>
        {MARKETS.map(m => (
          <button key={m.id} onClick={() => { setActiveMarket(m.id); setSectorFilter("Tous"); setCountryFilter("Tous"); setSearch(""); setSelectedTicker(null); }}
            style={{
              background: activeMarket === m.id ? `${m.color}22` : "transparent",
              border: `1px solid ${activeMarket === m.id ? m.color : C.border}`,
              borderRadius: 8, padding: "7px 14px", cursor: "pointer",
              color: activeMarket === m.id ? m.color : C.textDim,
              fontWeight: activeMarket === m.id ? 700 : 400,
              fontSize: "0.75rem", whiteSpace: "nowrap" as const,
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s",
            }}>
            <span style={{ fontSize: "1rem" }}>{m.flag}</span>
            <div style={{ textAlign: "left" as const }}>
              <div style={{ fontWeight: 700 }}>{m.name}</div>
              <div style={{ fontSize: "0.55rem", color: C.textDim }}>{m.region}</div>
            </div>
            <span style={{
              background: activeMarket === m.id ? m.color : C.border,
              color: activeMarket === m.id ? "#000" : C.textDim,
              borderRadius: 10, padding: "1px 6px", fontSize: "0.6rem", fontWeight: 700
            }}>{m.companies.length}</span>
          </button>
        ))}
      </div>

      {/* ── MARKET KPIs ── */}
      <div style={{ display: "flex", gap: 10, padding: "12px 16px", flexWrap: "wrap", borderBottom: `1px solid ${C.border}` }}>
        {[
          { l: "Marché actif", v: market.fullName, c: market.color },
          { l: "Capitalisaton totale", v: formatCap(totalCap, market.currency), c: C.gold },
          { l: "Sociétés listées", v: `${market.companies.length}`, c: C.blue },
          { l: "En hausse", v: `${rising}`, c: C.green },
          { l: "En baisse", v: `${falling}`, c: C.red },
          { l: "Variation moyenne", v: `${Number(avgVar) >= 0 ? "+" : ""}${avgVar}%`, c: Number(avgVar) >= 0 ? C.green : C.red },
        ].map(k => (
          <div key={k.l} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 14px", flex: "1 1 130px" }}>
            <div style={{ fontSize: "0.58rem", color: C.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{k.l}</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: k.c, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* ── FILTERS ── */}
      <div style={{ padding: "10px 16px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        {/* Search */}
        <input
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "7px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.panel, color: C.text, fontSize: "0.75rem", width: 180, outline: "none" }}
        />

        {/* Sector filter */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.62rem", color: C.textDim, alignSelf: "center", marginRight: 2 }}>SECTEUR</span>
          {sectors.map(s => (
            <button key={s} onClick={() => setSectorFilter(s)} style={{
              padding: "5px 10px", borderRadius: 6, border: `1px solid ${sectorFilter === s ? market.color : C.border}`,
              background: sectorFilter === s ? `${market.color}22` : "transparent",
              color: sectorFilter === s ? market.color : C.textDim,
              fontSize: "0.68rem", cursor: "pointer", fontWeight: sectorFilter === s ? 700 : 400,
              transition: "all 0.15s", whiteSpace: "nowrap" as const,
            }}>{s}</button>
          ))}
        </div>

        {/* Country filter — only for BRVM */}
        {showCountryFilter && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.62rem", color: C.textDim, alignSelf: "center", marginRight: 2 }}>PAYS</span>
            {countries.map(c => (
              <button key={c} onClick={() => setCountryFilter(c)} style={{
                padding: "5px 10px", borderRadius: 6, border: `1px solid ${countryFilter === c ? C.teal : C.border}`,
                background: countryFilter === c ? `${C.teal}22` : "transparent",
                color: countryFilter === c ? C.teal : C.textDim,
                fontSize: "0.68rem", cursor: "pointer", fontWeight: countryFilter === c ? 700 : 400,
                transition: "all 0.15s", whiteSpace: "nowrap" as const,
              }}>{c}</button>
            ))}
          </div>
        )}

        {/* Reset */}
        {(sectorFilter !== "Tous" || countryFilter !== "Tous" || search) && (
          <button onClick={() => { setSectorFilter("Tous"); setCountryFilter("Tous"); setSearch(""); }} style={{
            padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.red}`,
            background: "transparent", color: C.red, fontSize: "0.68rem", cursor: "pointer",
          }}>✕ Reset</button>
        )}

        <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: C.textDim }}>
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* ── TABLE ── */}
      <div style={{ padding: "12px 16px", overflowX: "auto" }}>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", minWidth: 700 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.bg }}>
                <th style={{ ...thStyle(""), cursor: "default" }}>Titre</th>
                <th style={{ ...thStyle("") }}>Société</th>
                {showCountryFilter && <th style={{ ...thStyle("") }}>Pays</th>}
                <th style={{ ...thStyle("") }}>Secteur</th>
                <th onClick={() => handleSort("price")} style={thStyle("price")}>
                  Prix {sortCol === "price" ? (sortAsc ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("variation")} style={thStyle("variation")}>
                  Var. {sortCol === "variation" ? (sortAsc ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("volume")} style={thStyle("volume")}>
                  Volume {sortCol === "volume" ? (sortAsc ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("mktcap")} style={thStyle("mktcap")}>
                  Cap. {sortCol === "mktcap" ? (sortAsc ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("per")} style={thStyle("per")}>
                  PER {sortCol === "per" ? (sortAsc ? "↑" : "↓") : "↕"}
                </th>
                <th style={{ ...thStyle(""), cursor: "default" }}>Signal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((co, i) => {
                const sig = getSignal(co.per, co.variation);
                const isSelected = selectedTicker === co.ticker;
                return (
                  <tr key={co.ticker}
                    onClick={() => setSelectedTicker(isSelected ? null : co.ticker)}
                    style={{
                      borderTop: `1px solid ${C.border}`,
                      background: isSelected ? "#1C233388" : i % 2 === 0 ? "transparent" : "#0D111722",
                      cursor: "pointer", transition: "background 0.15s",
                      borderLeft: isSelected ? `3px solid ${co.color}` : `3px solid transparent`,
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "#1C233355"; }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "transparent" : "#0D111722"; }}>
                    <td style={{ padding: "11px 14px", fontWeight: 700, color: co.color, fontSize: "0.8rem" }}>
                      {co.flag} {co.ticker}
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: "0.78rem" }}>{co.name}</td>
                    {showCountryFilter && <td style={{ padding: "11px 14px", fontSize: "0.73rem", color: C.textDim }}>{co.country}</td>}
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ background: "#1C2333", border: `1px solid ${C.border}`, padding: "3px 8px", borderRadius: 20, fontSize: "0.62rem", color: C.silver }}>
                        {co.sector}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: "0.8rem" }}>
                      {co.price.toLocaleString("fr-FR")} <span style={{ fontSize: "0.6rem", color: C.textDim }}>{co.currency}</span>
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: "0.78rem", color: co.variation > 0 ? C.green : co.variation < 0 ? C.red : C.textDim }}>
                      {co.variation > 0 ? "▲" : co.variation < 0 ? "▼" : "—"} {Math.abs(co.variation)}%
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: "0.73rem", color: C.textDim }}>
                      {co.volume.toLocaleString("fr-FR")}
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: "0.73rem", color: C.silver }}>
                      {co.mktcap.toLocaleString("fr-FR")} Mds
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: "0.73rem", color: co.per < 10 ? C.green : co.per < 15 ? C.gold : C.textDim }}>
                      {co.per}x
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ background: `${sig.color}22`, color: sig.color, border: `1px solid ${sig.color}55`, padding: "3px 8px", borderRadius: 20, fontSize: "0.62rem", fontWeight: 700, whiteSpace: "nowrap" as const }}>
                        {sig.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DETAIL PANEL ── */}
      {selected && (
        <div style={{ margin: "0 16px 16px", background: C.panel, border: `1px solid ${selected.color}44`, borderRadius: 10, padding: 16, borderLeft: `4px solid ${selected.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: selected.color }}>{selected.flag} {selected.ticker} — {selected.name}</div>
              <div style={{ fontSize: "0.7rem", color: C.textDim, marginTop: 2 }}>{selected.country} · {selected.sector} · {market.currency}</div>
            </div>
            <button onClick={() => setSelectedTicker(null)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.7rem" }}>✕ Fermer</button>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { l: "Prix actuel", v: `${selected.price.toLocaleString("fr-FR")} ${selected.currency}`, c: C.text },
              { l: "Variation", v: `${selected.variation > 0 ? "▲ +" : selected.variation < 0 ? "▼ " : ""}${selected.variation}%`, c: selected.variation > 0 ? C.green : selected.variation < 0 ? C.red : C.textDim },
              { l: "Volume échangé", v: selected.volume.toLocaleString("fr-FR"), c: C.silver },
              { l: "Capitalisation", v: `${selected.mktcap.toLocaleString("fr-FR")} Mds ${selected.currency}`, c: C.gold },
              { l: "PER", v: `${selected.per}x`, c: selected.per < 10 ? C.green : selected.per < 15 ? C.gold : C.textDim },
              { l: "Signal", v: getSignal(selected.per, selected.variation).label, c: getSignal(selected.per, selected.variation).color },
              { l: "Bourse", v: market.name, c: market.color },
            ].map(k => (
              <div key={k.l} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 14px", flex: "1 1 120px", minWidth: 100 }}>
                <div style={{ fontSize: "0.58rem", color: C.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{k.l}</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: k.c }}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{ textAlign: "center", padding: "10px 16px", fontSize: "0.58rem", color: C.textDim, borderTop: `1px solid ${C.border}`, background: C.panel }}>
        Sources : BRVM · NGX · GSE · NSE Kenya · JSE — Données à titre informatif uniquement. ⚠️ Non constitutif de conseil en investissement.
      </div>
    </div>
  );
}
