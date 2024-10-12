import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import classRoutes from "./routes/classRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
db();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/classes", classRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
