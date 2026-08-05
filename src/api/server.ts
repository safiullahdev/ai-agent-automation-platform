import express from "express";
import path from "path";
import agentRoutes from "./routes/agentRoutes.js";

const app = express();
const PORT = 3000;

const publicPath = path.join(
  process.cwd(),
  "agents",
  "coordinator-agent",
  "public"
);

app.use(express.json());

app.use(express.static(publicPath));

app.use("/api/agents", agentRoutes);

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

app.post("/test", (req, res) => {
  res.json({
    received: req.body,
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;