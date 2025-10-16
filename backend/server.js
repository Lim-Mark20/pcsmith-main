import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import partsRouter from "./routes/parts.js";
import buildRoutes from "./routes/builds.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/parts", partsRouter);
app.use("/api/builds", buildRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("PCSmith is running..");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));