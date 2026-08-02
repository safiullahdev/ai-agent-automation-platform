import { Router } from "express";
import { AgentController } from "../controllers/AgentController.js";

const router = Router();

router.get("/", AgentController.getAgentApi);
router.post("/execute", AgentController.executeAgent);

export default router;