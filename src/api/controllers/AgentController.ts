import type { Request, Response } from "express";
import { CoordinatorAgent } from "../../../agents/coordinator-agent/src/coordinatorAgent.js";

const coordinatorAgent = new CoordinatorAgent();

export class AgentController {
  static getAgentApi(_req: Request, res: Response): void {
    res.json({
      message: "Agent API",
    });
  }

  static executeAgent(req: Request, res: Response): void {
    const { prompt } = req.body as { prompt?: string };

    if (!prompt || prompt.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Prompt is required",
      });

      return;
    }

    const result = coordinatorAgent.route({
      prompt,
    });

    res.json({
      success: true,
      result,
    });
  }
}