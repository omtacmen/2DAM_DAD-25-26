import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = "http://localhost:3001/api/alumnos";

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request(url) {
  const res = await fetch(url);
  if (res.ok) return parseJsonSafe(res);

  const err = await parseJsonSafe(res);
  throw new Error(err?.message || `Error HTTP ${res.status}`);
}

export default function AlumnosEstadisticas() {

  const [statsSexo, setStatsSexo] = useState(null);
  const [statsRep, setStatsRep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function cargar() {
    setLoading(true);
    setErrorMsg("");
    try {
      const [sx, rp] = await Promise.all([
        request(`${API}/stats/sexo`),
        request(`${API}/stats/repetidor`),
      ]);
      setStatsSexo(sx);
      setStatsRep(rp);
    } catch (e) {
      setErrorMsg(e.message || "Error cargando estadísticas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  const dataSexo = useMemo(() => {
    if (!statsSexo) return null;
    return {
      labels: ["Masculino", "Femenino"],
      datasets: [
        {
          label: "Sexo",
          data: [statsSexo.masculino, statsSexo.femenino],
          backgroundColor: [
            "red", // Masculino
            "blue" // Femenino
          ]
        },
      ],
    };
  }, [statsSexo]);

  const dataRep = useMemo(() => {
    if (!statsRep) return null;
    return {
      labels: ["Repetidor", "No repetidor"],
      datasets: [
        {
          label: "Repetidor",
          data: [statsRep.repetidor, statsRep.noRepetidor],
          backgroundColor: [
            "red",
            "green"
          ]
        },
      ],
    };
  }, [statsRep]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const label = ctx.label || "";
              const value = ctx.parsed ?? 0;
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total ? ((value / total) * 100).toFixed(2) : "0.00";
              return `${label}: ${value} (${pct}%)`;
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Estadísticas (Chart.js)</h2>
        <button onClick={cargar} disabled={loading}>
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>

      <div style={{ color: "#666", marginTop: 6 }}>
        Backend: <code>{import.meta.env.VITE_API_URL}</code>
      </div>

      {errorMsg && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            border: "1px solid #f3c0c0",
            background: "#ffecec",
            borderRadius: 8,
          }}
        >
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 14,
        }}
      >
        {/* Pie Sexo */}
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Sexo (activos)</h3>

          <div style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>
            Total: <strong>{statsSexo?.total ?? "—"}</strong> · Masculino:{" "}
            <strong>{statsSexo?.masculino ?? "—"}</strong> · Femenino:{" "}
            <strong>{statsSexo?.femenino ?? "—"}</strong>
          </div>

          <div style={{ height: 280 }}>
            {dataSexo ? <Pie data={dataSexo} options={options} /> : <p>{loading ? "Cargando…" : "Sin datos"}</p>}
          </div>
        </div>

        {/* Pie Repetidor */}
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Repetidor (activos)</h3>

          <div style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>
            Total: <strong>{statsRep?.total ?? "—"}</strong> · Repetidor:{" "}
            <strong>{statsRep?.repetidor ?? "—"}</strong> · No repetidor:{" "}
            <strong>{statsRep?.noRepetidor ?? "—"}</strong>
          </div>

          <div style={{ height: 280 }}>
            {dataRep ? <Pie data={dataRep} options={options} /> : <p>{loading ? "Cargando…" : "Sin datos"}</p>}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 10, color: "#666", fontSize: 12 }}>
        Endpoints usados: <code>/stats/sexo</code> y <code>/stats/repetidor</code>
      </div>
    </div>
  );
}
