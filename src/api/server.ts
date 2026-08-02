import express from "express";
import agentRoutes from "./routes/agentRoutes.js";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/agents", agentRoutes);
app.get("/", (_req, res) => {
  res.send("AI Agent Automation Platform API");
});

app.post("/test", (req, res) => {
  res.json({
    received: req.body,
  });
});
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});