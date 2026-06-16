import express from "express";
import reportRoutes from "./routes/report.routes";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

const app = express();
const PORT = 5001;

dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Service Running");
});

// API Routes
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// Handle Process Shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT received");

  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received");

  process.exit(0);
});
// Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
});
// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);

  process.exit(1);
});