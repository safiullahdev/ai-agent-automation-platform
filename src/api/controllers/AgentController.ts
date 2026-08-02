import type { Request, Response } from "express";

export class AgentController {
  static getAgentApi(_req: Request, res: Response): void {
    res.json({
      message: "Agent API",
    });
  }
}