import { Router } from "express";
import {
  listAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  bajaAlumno,
  deleteAlumnoFisico,
  statsSexo,
  statsRepetidor
} from "../controllers/alumnos.controller.js";

const router = Router();

/* =========================
   CRUD ALUMNOS
   ========================= */

// LISTAR
router.get("/list", listAlumnos);

// OBTENER UNO
router.get("/get/:id", getAlumnoById);

// INSERTAR
router.post("/insert", createAlumno);

// ACTUALIZAR
router.put("/update/:id", updateAlumno);

// DESHABILITAR ALUMNO (Deshabilitamos alumno, pero no lo eliminamos de la base de datos)
router.delete("/delete/:id", bajaAlumno);

// ELIMINAMOS ALUMNO DE LA BASE DE DATOS
router.delete("/delete-fisico/:id", deleteAlumnoFisico);

/* =========================
   ESTADÍSTICAS ( PARA GRÁFICAS )
   ========================= */

router.get("/stats/sexo", statsSexo);
router.get("/stats/repetidor", statsRepetidor);

export default router;
