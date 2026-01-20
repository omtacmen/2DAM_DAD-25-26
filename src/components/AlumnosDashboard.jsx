import { useEffect, useMemo, useState } from "react";

const API = "http://localhost:3001/api/alumnos";

const initialForm = {
  matricula: "",
  nombre: "",
  sexo: "M",
  edad: "",
  email: "",
  repetidor: false,
  activo: true,
};

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request(url, options) {
  const res = await fetch(url, options);
  if (res.ok) return parseJsonSafe(res);

  const err = await parseJsonSafe(res);
  const message = err?.message || `Error HTTP ${res.status}`;
  throw new Error(message);
}

export default function AlumnosDashboard() {
  const [alumnos, setAlumnos] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(1); // 1 activos, 0 inactivos

  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const [statsSexo, setStatsSexo] = useState(null);
  const [statsRepetidor, setStatsRepetidor] = useState(null);

  const selectedLabel = useMemo(
    () => (selectedId ? `Id ${selectedId}` : "ninguno"),
    [selectedId]
  );

  function onChangeField(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function limpiar() {
    setSelectedId(null);
    setForm(initialForm);
  }

  async function cargarTodoElListado() {
    const data = await request(`${API}/list`, { method: "GET" });
    setAlumnos(Array.isArray(data) ? data : []);
  }

  async function cargarListado() {
    const data = await request(`${API}/list?activo=${filtroActivo}`, { method: "GET" });
    setAlumnos(Array.isArray(data) ? data : []);
  }

  async function cargarStats() {
    const [sx, rp] = await Promise.all([
      request(`${API}/stats/sexo`, { method: "GET" }),
      request(`${API}/stats/repetidor`, { method: "GET" }),
    ]);
    setStatsSexo(sx);
    setStatsRepetidor(rp);
  }

  useEffect(() => {
    cargarListado().catch((e) => window.alert(e.message));
  }, [filtroActivo]);

  useEffect(() => {
    cargarStats().catch((e) => window.alert(e.message));
  }, []);

  async function seleccionarAlumno(id) {
    try {
      const a = await request(`${API}/get/${id}`, { method: "GET" });
      setSelectedId(a.Id);
      setForm({
        matricula: a.Matricula ?? "",
        nombre: a.Nombre ?? "",
        sexo: a.Sexo ?? "M",
        edad: a.Edad ?? "",
        email: a.Email ?? "",
        repetidor: !!a.Repetidor,
        activo: !!a.Activo,
      });
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function insertAlumno() {
    try {
      const payload = {
        matricula: form.matricula.trim(),
        nombre: form.nombre.trim(),
        sexo: form.sexo,
        edad: form.edad === "" ? null : Number(form.edad),
        email: form.email.trim(),
        repetidor: form.repetidor,
      };

      await request(`${API}/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      limpiar();
      await cargarListado();
      await cargarStats();
      window.alert("Alumno insertado (insert)");
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function updateAlumno() {
    if (!selectedId) return window.alert("Selecciona primero un alumno de la tabla.");

    try {
      const payload = {
        matricula: form.matricula.trim(),
        nombre: form.nombre.trim(),
        sexo: form.sexo,
        edad: form.edad === "" ? null : Number(form.edad),
        email: form.email.trim(),
        repetidor: form.repetidor,
        activo: form.activo ? 1 : 0,
      };

      await request(`${API}/update/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await cargarListado();
      await cargarStats();
      window.alert("Alumno actualizado (update)");
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function deleteAlumno() {
    if (!selectedId) return window.alert("Selecciona primero un alumno de la tabla.");
    if (!window.confirm("¿Dar de baja al alumno? (delete lógico: Activo=0)")) return;

    try {
      await request(`${API}/delete/${selectedId}`, { method: "DELETE" });

      limpiar();
      await cargarListado();
      await cargarStats();
      window.alert("Alumno dado de baja (delete)");
    } catch (e) {
      window.alert(e.message);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Panel de Alumnos (API + React)</h2>

      {/* ESTADISTICAS */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12, minWidth: 260 }}>
          <strong>Stats Sexo</strong>
          <div style={{ marginTop: 8, fontSize: 14 }}>
            Total (activos): {statsSexo?.total ?? "—"} <br />
            Masculino: {statsSexo?.masculino ?? "—"} ({statsSexo?.porcentaje?.masculino ?? "—"}%) <br />
            Femenino: {statsSexo?.femenino ?? "—"} ({statsSexo?.porcentaje?.femenino ?? "—"}%)
          </div>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12, minWidth: 260 }}>
          <strong>Stats Repetidor</strong>
          <div style={{ marginTop: 8, fontSize: 14 }}>
            Total (activos): {statsRepetidor?.total ?? "—"} <br />
            Repetidor: {statsRepetidor?.repetidor ?? "—"} ({statsRepetidor?.porcentaje?.repetidor ?? "—"}%) <br />
            No repetidor: {statsRepetidor?.noRepetidor ?? "—"} ({statsRepetidor?.porcentaje?.noRepetidor ?? "—"}%)
          </div>
        </div>

        <button onClick={() => cargarStats().catch((e) => window.alert(e.message))} style={{ height: 42 }}>
          Refrescar stats
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
        {/* TABLA */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Listado</h3>

            <label style={{ marginLeft: "auto" }}>
              Filtro:&nbsp;
              <select value={filtroActivo} onChange={(e) => setFiltroActivo(Number(e.target.value))}>
                <option value={1}>Activos</option>
                <option value={0}>Inactivos</option>
              </select>
            </label>

            <button onClick={() => cargarListado().catch((e) => window.alert(e.message))}>
              Recargar list
            </button>
          </div>

          <div style={{ maxHeight: 340, overflowY: "auto", border: "1px solid #ddd" }}>
            <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>
                  <th align="left">Id</th>
                  <th align="left">Matrícula</th>
                  <th align="left">Nombre</th>
                  <th align="left">Sexo</th>
                  <th align="left">Edad</th>
                  <th align="left">Email</th>
                  <th align="left">Rep.</th>
                  <th align="left">Activo</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((a) => (
                  <tr
                    key={a.Id}
                    onClick={() => seleccionarAlumno(a.Id)}
                    style={{
                      cursor: "pointer",
                      borderTop: "1px solid #eee",
                      background: selectedId === a.Id ? "#e9f3ff" : "transparent",
                    }}
                  >
                    <td>{a.Id}</td>
                    <td>{a.Matricula}</td>
                    <td>{a.Nombre}</td>
                    <td>{a.Sexo}</td>
                    <td>{a.Edad ?? ""}</td>
                    <td>{a.Email}</td>
                    <td>{a.Repetidor ? "Sí" : "No"}</td>
                    <td>{a.Activo ? "Sí" : "No"}</td>
                  </tr>
                ))}
                {alumnos.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ padding: 14, textAlign: "center" }}>
                      No hay alumnos para este filtro
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 8, color: "#666" }}>
            Click en una fila: <code>GET /get/:id</code>
          </p>
        </div>

        {/* FORMULARIO */}
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Formulario</h3>
          <div style={{ color: "#666", fontSize: 13, marginBottom: 8 }}>
            Seleccionado: <strong>{selectedLabel}</strong>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label>
              Matrícula
              <input name="matricula" value={form.matricula} onChange={onChangeField} style={{ width: "100%" }} />
            </label>

            <label>
              Nombre
              <input name="nombre" value={form.nombre} onChange={onChangeField} style={{ width: "100%" }} />
            </label>

            <label>
              Sexo
              <select name="sexo" value={form.sexo} onChange={onChangeField} style={{ width: "100%" }}>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </label>

            <label>
              Edad
              <input name="edad" type="number" value={form.edad} onChange={onChangeField} style={{ width: "100%" }} />
            </label>

            <label>
              Email
              <input name="email" value={form.email} onChange={onChangeField} style={{ width: "100%" }} />
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input name="repetidor" type="checkbox" checked={form.repetidor} onChange={onChangeField} />
              Repetidor
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input name="activo" type="checkbox" checked={form.activo} onChange={onChangeField} />
              Alumno activo
            </label>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              <button onClick={insertAlumno}>Guardar (POST /insert)</button>
              <button onClick={updateAlumno}>Modificar (PUT /update/:id)</button>
              <button onClick={deleteAlumno}>Dar de baja (DELETE /delete/:id)</button>
              <button onClick={limpiar}>Limpiar</button>
            </div>

            <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
              - Guardar usa <code>POST /insert</code> (crea Activo=1) <br />
              - Modificar usa <code>PUT /update/:id</code> (incluye Activo) <br />
              - Dar de baja usa <code>DELETE /delete/:id</code> (pone Activo=0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
