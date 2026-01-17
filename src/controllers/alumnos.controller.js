import { pool } from "../db/pool.js";
import { isValidEmail, isValidSexo, toBool01 } from "../utils/validation.js";

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}

export async function listAlumnos(req, res, next) {
  try {
    const { activo } = req.query; // activo=1/0 opcional
    const params = [];
    let where = "";

    if (activo === "1" || activo === "0") {
      where = "WHERE Activo = ?";
      params.push(Number(activo));
    }

    const [rows] = await pool.query(
      `
      SELECT Id, Matricula, Nombre, Sexo, Edad, Email, Repetidor, Activo
      FROM Alumnos
      ${where}
      ORDER BY Id DESC
      `,
      params
    );

    res.json(rows);
  } catch (e) {
    next(e);
  }
}

export async function getAlumnoById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw badRequest("Id inválido");

    const [rows] = await pool.query(
      `
      SELECT Id, Matricula, Nombre, Sexo, Edad, Email, Repetidor, Activo
      FROM Alumnos
      WHERE Id = ?
      `,
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: true, message: "Alumno no encontrado" });
    res.json(rows[0]);
  } catch (e) {
    next(e);
  }
}

export async function createAlumno(req, res, next) {
  try {
    const { matricula, nombre, sexo, edad, email, repetidor } = req.body;

    if (!matricula || typeof matricula !== "string") throw badRequest("Matrícula obligatoria");
    if (!nombre || typeof nombre !== "string") throw badRequest("Nombre obligatorio");
    if (!isValidSexo(sexo)) throw badRequest("Sexo debe ser 'M' o 'F'");
    if (!email || !isValidEmail(email)) throw badRequest("Email inválido");

    const edadNum = edad === null || edad === undefined || edad === "" ? null : Number(edad);
    if (edadNum !== null) {
      if (!Number.isInteger(edadNum) || edadNum < 0 || edadNum > 120) throw badRequest("Edad inválida");
    }

    const repetidor01 = toBool01(repetidor);

    const [result] = await pool.query(
      `
      INSERT INTO Alumnos (Matricula, Nombre, Sexo, Edad, Email, Repetidor, Activo)
      VALUES (?, ?, ?, ?, ?, ?, 1)
      `,
      [matricula.trim(), nombre.trim(), sexo, edadNum, email.trim(), repetidor01]
    );

    res.status(201).json({
      Id: result.insertId,
      Matricula: matricula.trim(),
      Nombre: nombre.trim(),
      Sexo: sexo,
      Edad: edadNum,
      Email: email.trim(),
      Repetidor: repetidor01,
      Activo: 1,
    });
  } catch (e) {
    // Duplicado de matrícula
    if (e?.code === "ER_DUP_ENTRY") {
      e.statusCode = 409;
      e.message = "Ya existe un alumno con esa matrícula";
    }
    next(e);
  }
}

export async function updateAlumno(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw badRequest("Id inválido");

    const { matricula, nombre, sexo, edad, email, repetidor, activo } = req.body;

    // Permitimos actualización parcial, pero validamos lo que venga
    const fields = [];
    const params = [];

    if (matricula !== undefined) {
      if (!matricula || typeof matricula !== "string") throw badRequest("Matrícula inválida");
      fields.push("Matricula = ?");
      params.push(matricula.trim());
    }

    if (nombre !== undefined) {
      if (!nombre || typeof nombre !== "string") throw badRequest("Nombre inválido");
      fields.push("Nombre = ?");
      params.push(nombre.trim());
    }

    if (sexo !== undefined) {
      if (!isValidSexo(sexo)) throw badRequest("Sexo debe ser 'M' o 'F'");
      fields.push("Sexo = ?");
      params.push(sexo);
    }

    if (edad !== undefined) {
      const edadNum = edad === null || edad === "" ? null : Number(edad);
      if (edadNum !== null) {
        if (!Number.isInteger(edadNum) || edadNum < 0 || edadNum > 120) throw badRequest("Edad inválida");
      }
      fields.push("Edad = ?");
      params.push(edadNum);
    }

    if (email !== undefined) {
      if (!email || !isValidEmail(email)) throw badRequest("Email inválido");
      fields.push("Email = ?");
      params.push(email.trim());
    }

    if (repetidor !== undefined) {
      fields.push("Repetidor = ?");
      params.push(toBool01(repetidor));
    }

    if (activo !== undefined) {
      const activo01 = activo === 1 || activo === "1" || activo === true ? 1 : 0;
      fields.push("Activo = ?");
      params.push(activo01);
    }

    if (fields.length === 0) throw badRequest("No se enviaron campos para modificar");

    params.push(id);

    const [result] = await pool.query(
      `
      UPDATE Alumnos
      SET ${fields.join(", ")}
      WHERE Id = ?
      `,
      params
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: true, message: "Alumno no encontrado" });

    // Devolvemos el actualizado
    const [rows] = await pool.query(
      `SELECT Id, Matricula, Nombre, Sexo, Edad, Email, Repetidor, Activo FROM Alumnos WHERE Id = ?`,
      [id]
    );

    res.json(rows[0]);
  } catch (e) {
    if (e?.code === "ER_DUP_ENTRY") {
      e.statusCode = 409;
      e.message = "Ya existe un alumno con esa matrícula";
    }
    next(e);
  }
}

export async function bajaAlumno(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw badRequest("Id inválido");

    // “Dar de baja” = baja lógica
    const [result] = await pool.query(
      `
      UPDATE Alumnos
      SET Activo = 0
      WHERE Id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: true, message: "Alumno no encontrado" });

    res.json({ ok: true, message: "Alumno dado de baja (Activo=0)" });
  } catch (e) {
    next(e);
  }
}

export async function deleteAlumnoFisico(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw badRequest("Id inválido");

    const [result] = await pool.query(`DELETE FROM Alumnos WHERE Id = ?`, [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: true, message: "Alumno no encontrado" });

    res.json({ ok: true, message: "Alumno eliminado físicamente" });
  } catch (e) {
    next(e);
  }
}

/**
 * Endpoints para tus gráficos:
 * - Sexo: % M / % F
 * - Repetidor: % repetidor / % no repetidor
 */
export async function statsSexo(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
      SELECT Sexo, COUNT(*) AS total
      FROM Alumnos
      WHERE Activo = 1
      GROUP BY Sexo
      `
    );

    const m = rows.find(r => r.Sexo === "M")?.total ?? 0;
    const f = rows.find(r => r.Sexo === "F")?.total ?? 0;
    const total = m + f;

    res.json({
      total,
      masculino: m,
      femenino: f,
      porcentaje: total === 0 ? { masculino: 0, femenino: 0 } : {
        masculino: Number(((m / total) * 100).toFixed(2)),
        femenino: Number(((f / total) * 100).toFixed(2)),
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function statsRepetidor(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
      SELECT Repetidor, COUNT(*) AS total
      FROM Alumnos
      WHERE Activo = 1
      GROUP BY Repetidor
      `
    );

    const rep = rows.find(r => Number(r.Repetidor) === 1)?.total ?? 0;
    const noRep = rows.find(r => Number(r.Repetidor) === 0)?.total ?? 0;
    const total = rep + noRep;

    res.json({
      total,
      repetidor: rep,
      noRepetidor: noRep,
      porcentaje: total === 0 ? { repetidor: 0, noRepetidor: 0 } : {
        repetidor: Number(((rep / total) * 100).toFixed(2)),
        noRepetidor: Number(((noRep / total) * 100).toFixed(2)),
      },
    });
  } catch (e) {
    next(e);
  }
}

