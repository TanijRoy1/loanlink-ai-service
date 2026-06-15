import express from "express";
import reportRoutes from "./routes/report.routes";

const app = express();
const PORT = 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Service Running");
});

// API Routes
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});