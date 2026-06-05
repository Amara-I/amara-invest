"use client";
import { useState } from "react";

const entreprises = [
  // ========== AGRICULTURE ==========
  { ticker: "PALC", nom: "Palm CI", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 7600, variation: 0.5, volume: 2100, capitalisation: 45600000000 },
  { ticker: "SICC", nom: "SICOR", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 4200, variation: -0.3, volume: 980, capitalisation: 25200000000 },
  { ticker: "SOGC", nom: "SOGB", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 3800, variation: 1.1, volume: 1500, capitalisation: 22800000000 },
  { ticker: "SAFC", nom: "SAPH", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 5200, variation: 0.8, volume: 1200, capitalisation: 31200000000 },
  { ticker: "SCRC", nom: "SUCRIVOIRE", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 2900, variation: -1.2, volume: 870, capitalisation: 17400000000 },
  { ticker: "SIAC", nom: "SIAT CI", pays: "Côte d'Ivoire", secteur: "Agriculture", prix: 3600, variation: 0.4, volume: 650, capitalisation: 21600000000 },

  // ========== BANQUE ==========
  { ticker: "ETIT", nom: "Ecobank CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 4200, variation: 1.2, volume: 15420, capitalisation: 252000000000 },
  { ticker: "BICC", nom: "BICICI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 6700, variation: 2.1, volume: 4200, capitalisation: 134000000000 },
  { ticker: "SGBC", nom: "Société Générale CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 9800, variation: 0.8, volume: 3100, capitalisation: 196000000000 },
  { ticker: "BOAB", nom: "Bank of Africa Bénin", pays: "Bénin", secteur: "Banque", prix: 5400, variation: 0.3, volume: 1800, capitalisation: 108000000000 },
  { ticker: "BOABF", nom: "Bank of Africa BF", pays: "Burkina Faso", secteur: "Banque", prix: 4800, variation: -0.5, volume: 1200, capitalisation: 96000000000 },
  { ticker: "BOAC", nom: "Bank of Africa CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 5100, variation: 1.0, volume: 2100, capitalisation: 102000000000 },
  { ticker: "BOAM", nom: "Bank of Africa Mali", pays: "Mali", secteur: "Banque", prix: 4600, variation: 0.6, volume: 950, capitalisation: 92000000000 },
  { ticker: "BOAN", nom: "Bank of Africa Niger", pays: "Niger", secteur: "Banque", prix: 4300, variation: -0.2, volume: 780, capitalisation: 86000000000 },
  { ticker: "BOAS", nom: "Bank of Africa Sénégal", pays: "Sénégal", secteur: "Banque", prix: 4900, variation: 0.9, volume: 1100, capitalisation: 98000000000 },
  { ticker: "BOAT", nom: "Bank of Africa Togo", pays: "Togo", secteur: "Banque", prix: 4700, variation: 0.4, volume: 890, capitalisation: 94000000000 },
  { ticker: "CBIBF", nom: "Coris Bank BF", pays: "Burkina Faso", secteur: "Banque", prix: 8200, variation: 1.5, volume: 3400, capitalisation: 164000000000 },
  { ticker: "NSBC", nom: "NSIA Banque CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 6800, variation: 1.3, volume: 2800, capitalisation: 136000000000 },
  { ticker: "ORGT", nom: "Oragroup Togo", pays: "Togo", secteur: "Banque", prix: 5300, variation: -0.8, volume: 1600, capitalisation: 106000000000 },
  { ticker: "SIBC", nom: "SIB CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 4800, variation: 1.8, volume: 3100, capitalisation: 96000000000 },

  // ========== DISTRIBUTION ==========
  { ticker: "CFAC", nom: "CFAO CI", pays: "Côte d'Ivoire", secteur: "Distribution", prix: 8500, variation: 0.6, volume: 2300, capitalisation: 170000000000 },
  { ticker: "SHEC", nom: "SHELL CI", pays: "Côte d'Ivoire", secteur: "Distribution", prix: 4100, variation: 0.9, volume: 1400, capitalisation: 82000000000 },
  { ticker: "TTLC", nom: "TOTAL CI", pays: "Côte d'Ivoire", secteur: "Distribution", prix: 1850, variation: -0.7, volume: 5600, capitalisation: 37000000000 },
  { ticker: "TTLS", nom: "TOTAL Sénégal", pays: "Sénégal", secteur: "Distribution", prix: 2100, variation: 0.5, volume: 3200, capitalisation: 42000000000 },

  // ========== ENERGIE ==========
  { ticker: "CIEC", nom: "CIE CI", pays: "Côte d'Ivoire", secteur: "Energie", prix: 2450, variation: 0.3, volume: 4100, capitalisation: 49000000000 },
  { ticker: "STBC", nom: "SETAO CI", pays: "Côte d'Ivoire", secteur: "Energie", prix: 2200, variation: 1.4, volume: 2300, capitalisation: 44000000000 },

  // ========== INDUSTRIE ==========
  { ticker: "SIVC", nom: "Air Liquide CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 3400, variation: 0.3, volume: 1200, capitalisation: 68000000000 },
  { ticker: "NEIC", nom: "NEI-CEDA CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 1850, variation: -1.0, volume: 560, capitalisation: 37000000000 },
  { ticker: "STAC", nom: "SITAB CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 5800, variation: 1.6, volume: 890, capitalisation: 116000000000 },
  { ticker: "UNLC", nom: "UNILEVER CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 6200, variation: -0.9, volume: 2100, capitalisation: 124000000000 },
  { ticker: "SOLC", nom: "SOLIBRA CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 95000, variation: 0.2, volume: 340, capitalisation: 285000000000 },

  // ========== TELECOM ==========
  { ticker: "SNTS", nom: "Sonatel", pays: "Sénégal", secteur: "Télécoms", prix: 18500, variation: -0.5, volume: 8300, capitalisation: 925000000000 },
  { ticker: "ONECI", nom: "Orange CI", pays: "Côte d'Ivoire", secteur: "Télécoms", prix: 12300, variation: -1.3, volume: 6700, capitalisation: 615000000000 },

  // ========== TRANSPORT ==========
  { ticker: "AVOC", nom: "Air Côte d'Ivoire", pays: "Côte d'Ivoire", secteur: "Transport", prix: 1650, variation: 2.3, volume: 4500, capitalisation: 33000000000 },
  { ticker: "SVOC", nom: "MOVIS CI", pays: "Côte d'Ivoire", secteur: "Transport", prix: 1200, variation: -0.4, volume: 2300, capitalisation: 24000000000 },
];

// Drapeaux pays
const drapeaux: Record<string, string> = {
  "Côte d'Ivoire": "🇨🇮",
  "Sénégal": "🇸🇳",
  "Burkina Faso": "🇧🇫",
  "Bénin": "🇧🇯",
  "Mali": "🇲🇱",
  "Niger": "🇳🇪",
  "Togo": "🇹🇬",
  "Guinée-Bissau": "🇬🇼",
};

// Couleurs secteurs
const couleursSecteur: Record<string, string> = {
  "Agriculture": "#16a34a",
  "Banque": "#2563eb",
  "Distribution": "#d97706",
  "Energie": "#dc2626",
  "Industrie": "#7c3aed",
  "Finance": "#0891b2",
  "Télécoms": "#db2777",
  "Transport": "#ea580c",
};

function formaterCapitalisation(val: number): string {
  if (val >= 1_000_000_000_000) return (val / 1_000_000_000_000).toFixed(1) + " T";
  if (val >= 1_000_000_000) return (val / 1_000_000_000).toFixed(1) + " Mrd";
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(0) + " M";
  return val.toLocaleString();
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [secteur, setSecteur] = useState("Tous");
  const [pays, setPays] = useState("Tous");
  const [tri, setTri] = useState<"prix" | "variation" | "volume" | "capitalisation" | "">("");
  const [triOrdre, setTriOrdre] = useState<"asc" | "desc">("desc");

  const secteurs = ["Tous", ...Array.from(new Set(entreprises.map(e => e.secteur))).sort()];
  const paysList = ["Tous", ...Array.from(new Set(entreprises.map(e => e.pays))).sort()];

  const handleTri = (colonne: typeof tri) => {
    if (tri === colonne) {
      setTriOrdre(triOrdre === "asc" ? "desc" : "asc");
    } else {
      setTri(colonne);
      setTriOrdre("desc");
    }
  };

  let filtered = entreprises.filter(e =>
    (secteur === "Tous" || e.secteur === secteur) &&
    (pays === "Tous" || e.pays === pays) &&
    (e.nom.toLowerCase().includes(search.toLowerCase()) ||
     e.ticker.toLowerCase().includes(search.toLowerCase()))
  );

  if (tri) {
    filtered = [...filtered].sort((a, b) =>
      triOrdre === "asc" ? a[tri] - b[tri] : b[tri] - a[tri]
    );
  }

  const stats = [
    { label: "Sociétés cotées", value: entreprises.length, color: "#3b82f6" },
    { label: "En hausse ▲", value: entreprises.filter(e => e.variation > 0).length, color: "#22c55e" },
    { label: "En baisse ▼", value: entreprises.filter(e => e.variation < 0).length, color: "#ef4444" },
    { label: "Pays représentés", value: paysList.length - 1, color: "#a855f7" },
    { label: "Cap. totale", value: formaterCapitalisation(entreprises.reduce((a, b) => a + b.capitalisation, 0)), color: "#f59e0b" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0f172a", minHeight: "100vh", color: "white" }}>

      {/* Header */}
      <div style={{ background: "#1e293b", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #f59e0b" }}>
        <div>
          <h1 style={{ margin: 0, color: "#f59e0b", fontSize: "26px" }}>📈 AMARA Invest</h1>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>Bourse Régionale des Valeurs Mobilières — UEMOA</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
          <div style={{ color: "#22c55e", fontSize: "12px", marginTop: "4px" }}>● Marché ouvert</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", padding: "30px 40px 10px", flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", flex: 1, minWidth: "140px", borderLeft: `4px solid ${s.color}` }}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filtres SECTEUR */}
      <div style={{ padding: "20px 40px 5px" }}>
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Filtrer par secteur
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {secteurs.map(s => (
            <button key={s} onClick={() => setSecteur(s)}
              style={{
                padding: "7px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px",
                background: secteur === s ? (couleursSecteur[s] || "#f59e0b") : "#1e293b",
                color: "white",
                fontWeight: secteur === s ? "bold" : "normal",
                borderLeft: secteur !== s && couleursSecteur[s] ? `3px solid ${couleursSecteur[s]}` : "none"
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres PAYS */}
      <div style={{ padding: "15px 40px 5px" }}>
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Filtrer par pays
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {paysList.map(p => (
            <button key={p} onClick={() => setPays(p)}
              style={{
                padding: "7px 16px", borderRadius: "20px", border: `1px solid ${pays === p ? "#a855f7" : "#334155"}`,
                cursor: "pointer", fontSize: "13px",
                background: pays === p ? "#a855f7" : "#1e293b",
                color: "white",
                fontWeight: pays === p ? "bold" : "normal"
              }}>
              {drapeaux[p] || ""} {p}
            </button>
          ))}
        </div>
      </div>

      {/* Barre de recherche */}
      <div style={{ padding: "15px 40px 10px" }}>
        <input
          placeholder="🔍 Rechercher une entreprise ou ticker..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "white", width: "320px", fontSize: "14px" }}
        />
        {(search || secteur !== "Tous" || pays !== "Tous") && (
          <button onClick={() => { setSearch(""); setSecteur("Tous"); setPays("Tous"); }}
            style={{ marginLeft: "10px", padding: "10px 16px", borderRadius: "8px", border: "none", background: "#334155", color: "#94a3b8", cursor: "pointer", fontSize: "13px" }}>
            ✕ Réinitialiser
          </button>
        )}
      </div>

      {/* Résultats */}
      <div style={{ padding: "0 40px 5px" }}>
        <p style={{ color: "#64748b", fontSize: "13px" }}>
          {filtered.length} société(s) affichée(s)
          {pays !== "Tous" && <span style={{ color: "#a855f7" }}> · {drapeaux[pays]} {pays}</span>}
          {secteur !== "Tous" && <span style={{ color: couleursSecteur[secteur] || "#f59e0b" }}> · {secteur}</span>}
        </p>
      </div>

      {/* Tableau */}
      <div style={{ padding: "0 40px 40px" }}>
        <div style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                <th style={{ padding: "15px 20px", textAlign: "left", color: "#94a3b8", fontSize: "13px" }}>Ticker</th>
                <th style={{ padding: "15px 20px", textAlign: "left", color: "#94a3b8", fontSize: "13px" }}>Entreprise</th>
                <th style={{ padding: "15px 20px", textAlign: "left", color: "#94a3b8", fontSize: "13px" }}>Pays</th>
                <th style={{ padding: "15px 20px", textAlign: "left", color: "#94a3b8", fontSize: "13px" }}>Secteur</th>
                {(["prix", "variation", "volume", "capitalisation"] as const).map(col => (
                  <th key={col} onClick={() => handleTri(col)}
                    style={{ padding: "15px 20px", textAlign: "left", color: tri === col ? "#f59e0b" : "#94a3b8", fontSize: "13px", cursor: "pointer", userSelect: "none" }}>
                    {col === "prix" ? "Prix (FCFA)" : col === "variation" ? "Variation" : col === "volume" ? "Volume" : "Capitalisation"}
                    {tri === col ? (triOrdre === "desc" ? " ↓" : " ↑") : " ↕"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} style={{ borderTop: "1px solid #0f172a" }}
                  onMouseEnter={ev => (ev.currentTarget.style.background = "#273548")}
                  onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 20px", fontWeight: "bold", color: "#f59e0b" }}>{e.ticker}</td>
                  <td style={{ padding: "14px 20px", fontWeight: "500" }}>{e.nom}</td>
                  <td style={{ padding: "14px 20px", color: "#94a3b8", fontSize: "13px" }}>
                    {drapeaux[e.pays]} {e.pays}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: couleursSecteur[e.secteur] || "#334155", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", color: "white" }}>
                      {e.secteur}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontWeight: "bold" }}>{e.prix.toLocaleString()} F</td>
                  <td style={{ padding: "14px 20px", color: e.variation > 0 ? "#22c55e" : e.variation < 0 ? "#ef4444" : "#94a3b8", fontWeight: "bold" }}>
                    {e.variation > 0 ? "▲" : e.variation < 0 ? "▼" : "—"} {Math.abs(e.variation)}%
                  </td>
                  <td style={{ padding: "14px 20px", color: "#94a3b8" }}>{e.volume.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "13px" }}>{formaterCapitalisation(e.capitalisation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}