import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Admin ERP backend is running" });
});

// Routes
app.use("/api/auth", authRoutes);
// TODO: team members - add more routes here as modules are built
// e.g. app.use("/api/employees", employeeRoutes);
// e.g. app.use("/api/inventory", inventoryRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
