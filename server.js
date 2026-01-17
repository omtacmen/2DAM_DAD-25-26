import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import alumnosRouter from "./src/routes/alumnos.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Usamos morgan para loguear por consola las peticiones http de entrada y salida, de esta forma
// veremos esas peticiones.
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true, service: "api-matriculas" }));

app.use("/api/alumnos", alumnosRouter);

// Middleware simple de errores
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: true,
    message: err.message || "Error interno",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

