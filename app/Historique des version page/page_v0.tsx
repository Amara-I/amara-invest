"use client";
import { useState } from "react";

const entreprises = [
  { ticker: "ETIT", nom: "Ecobank CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 4200, variation: 1.2, volume: 15420 },
  { ticker: "SNTS", nom: "Sonatel", pays: "Sénégal", secteur: "Télécoms", prix: 18500, variation: -0.5, volume: 8300 },
  { ticker: "BICC", nom: "BICICI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 6700, variation: 2.1, volume: 4200 },
  { ticker: "SGBC", nom: "Société Générale CI", pays: "Côte d'Ivoire", secteur: "Banque", prix: 9800, variation: 0.8, volume: 3100 },
  { ticker: "ONECI", nom: "Orange CI", pays: "Côte d'Ivoire", secteur: "Télécoms", prix: 12300, variation: -1.3, volume: 6700 },
  { ticker: "SIVC", nom: "Air Liquide CI", pays: "Côte d'Ivoire", secteur: "Industrie", prix: 3400, variation: 0.3, volume: 1200 },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [secteur, setSecteur] = useState("Tous");

  const filtered = entreprises.filter(e =>
    (secteur === "Tous" || e.secteur === secteur) &&
    (e.nom.toLowerCase().includes(search.toLowerCase()) || e.ticker.toLowerCase().includes(search.toLowerCase()))
  );

  const secteurs = ["Tous", "Banque", "Télécoms", "Industrie"];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      {/* Header */}
      <div style={{ background: "#1e293b", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, color: "#f59e0b", fontSize: "24px" }}>AMARA Invest</h1>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>Bourse Régionale des Valeurs Mobilières</p>
        </div>
        <div style={{ color: "#94a3b8", fontSize: "14px" }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "20px", padding: "30px 40px 10px" }}>
        {[
          { label: "Entreprises suivies", value: entreprises.length, color: "#3b82f6" },
          { label: "En hausse", value: entreprises.filter(e => e.variation > 0).length, color: "#22c55e" },
          { label: "En baisse", value: entreprises.filter(e => e.variation < 0).length, color: "#ef4444" },
          { label: "Volume total", value: entreprises.reduce((a, b) => a + b.volume, 0).toLocaleString(), color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", flex: 1, borderLeft: `4px solid ${s.color}` }}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ padding: "20px 40px", display: "flex", gap: "15px", alignItems: "center" }}>
        <input
          placeholder="Rechercher une entreprise..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "white", width: "250px", fontSize: "14px" }}
        />
        {secteurs.map(s => (
          <button key={s} onClick={() => setSecteur(s)}
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px",
              background: secteur === s ? "#f59e0b" : "#1e293b", color: secteur === s ? "black" : "white" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div style={{ padding: "0 40px 40px" }}>
        <div style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {["Ticker", "Entreprise", "Pays", "Secteur", "Prix (FCFA)", "Variation", "Volume"].map(h => (
                  <th key={h} style={{ padding: "15px 20px", textAlign: "left", color: "#94a3b8", fontSize: "13px", fontWeight: "600" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} style={{ borderTop: "1px solid #0f172a" }}
                  onMouseEnter={ev => (ev.currentTarget.style.background = "#273548")}
                  onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "15px 20px", fontWeight: "bold", color: "#f59e0b" }}>{e.ticker}</td>
                  <td style={{ padding: "15px 20px" }}>{e.nom}</td>
                  <td style={{ padding: "15px 20px", color: "#94a3b8" }}>{e.pays}</td>
                  <td style={{ padding: "15px 20px" }}>
                    <span style={{ background: "#0f172a", padding: "4px 10px", borderRadius: "20px", fontSize: "12px" }}>{e.secteur}</span>
                  </td>
                  <td style={{ padding: "15px 20px", fontWeight: "bold" }}>{e.prix.toLocaleString()}</td>
                  <td style={{ padding: "15px 20px", color: e.variation > 0 ? "#22c55e" : "#ef4444", fontWeight: "bold" }}>
                    {e.variation > 0 ? "▲" : "▼"} {Math.abs(e.variation)}%
                  </td>
                  <td style={{ padding: "15px 20px", color: "#94a3b8" }}>{e.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
