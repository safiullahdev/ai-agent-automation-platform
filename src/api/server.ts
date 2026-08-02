import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("AI Agent Automation Platform API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});