import type { Request, Response } from "express";
import { CoordinatorAgent } from "../../../agents/coordinator-agent/src/coordinatorAgent.js";
import { ManualTestAgent } from "../../../agents/manual-test-agent/src/manualTestAgent.js";
import { EmailAgent } from "../../agents/emailAgent/EmailAgent.js";
import { MicrosoftGraphService } from "../../agents/services/microsoftGraph/MicrosoftGraphService.js";
import type { MicrosoftGraphConfig } from "../../agents/services/microsoftGraph/MicrosoftGraphConfig.js";

const coordinatorAgent = new CoordinatorAgent();
const manualTestAgent = new ManualTestAgent();

type AgentName = "coordinator" | "manual-test" | "email";

interface ExecuteAgentRequest {
  agent?: AgentName;
  prompt?: string;
}

const graphConfig: MicrosoftGraphConfig = {
  tenantId: "demo-tenant",
  clientId: "demo-client",
  clientSecret: "demo-secret",
};

const graphService = new MicrosoftGraphService(graphConfig);
const emailAgent = new EmailAgent(graphService);

export class AgentController {
  static getAgentApi(_req: Request, res: Response): void {
    res.json({
      message: "Agent API",
    });
  }

  static async executeAgent(
    req: Request,
    res: Response
  ): Promise<void> {
    const { agent, prompt } = req.body as ExecuteAgentRequest;

    if (!prompt || prompt.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
      return;
    }

    if (!agent) {
      res.status(400).json({
        success: false,
        message: "Agent selection is required",
      });
      return;
    }

    const trimmedPrompt = prompt.trim();

    // Basic validation before directly calling Manual Test Agent
    if (agent === "manual-test") {
      const hasLetters = /[a-zA-Z]/.test(trimmedPrompt);

      if (!hasLetters) {
        res.status(400).json({
          success: false,
          requestedAgent: "manual-test",
          message:
            "Please enter a valid feature description, such as 'User login' or 'Submit payment form'.",
        });
        return;
      }
    }

    switch (agent) {
      case "coordinator": {
        const routingResult = coordinatorAgent.route({
          prompt: trimmedPrompt,
        });

        // Coordinator routed to Manual Test Agent
        if (routingResult.selectedAgent === "manual-test") {
          const hasLetters = /[a-zA-Z]/.test(trimmedPrompt);

          if (!hasLetters) {
            res.status(400).json({
              success: false,
              requestedAgent: "coordinator",
              executedAgent: "manual-test",
              message:
                "Please enter a valid feature description, such as 'User login' or 'Submit payment form'.",
            });
            return;
          }

          const result = await manualTestAgent.generate({ // nosemgrep: javascript.express.security.express-wkhtml-injection.express-wkhtmltoimage-injection
            featureDescription: trimmedPrompt,
          });
          

          res.json({
            success: true,
            requestedAgent: "coordinator",
            executedAgent: "manual-test",
            message:
              "Coordinator routed the request to the Manual Test Agent.",
            data: result,
          });
          return;
        }

        // Coordinator routed to Email Agent
        if (routingResult.selectedAgent === "email-agent") {
          const result = emailAgent.generateDraft(trimmedPrompt);

          res.json({
            success: true,
            requestedAgent: "coordinator",
            executedAgent: "email-agent",
            message:
              "Coordinator routed the request to the Email Agent.",
            data: result,
          });
          return;
        }

        // Coordinator could not find a supported agent
        res.json({
          success: true,
          requestedAgent: "coordinator",
          executedAgent: routingResult.selectedAgent,
          message: routingResult.message,
          data: routingResult,
        });
        return;
      }

      case "manual-test": {
        const result = await manualTestAgent.generate({ // nosemgrep: javascript.express.security.express-wkhtml-injection.express-wkhtmltoimage-injection
          featureDescription: trimmedPrompt,
        });

        res.json({
          success: true,
          requestedAgent: "manual-test",
          executedAgent: "manual-test",
          message: "Manual test cases generated successfully.",
          data: result,
        });
        return;
      }

      case "email": {
        const result = emailAgent.generateDraft(trimmedPrompt);

        res.json({
          success: true,
          requestedAgent: "email",
          executedAgent: "email",
          message: "Email draft generated successfully.",
          data: result,
        });
        return;
      }

      default: {
        res.status(400).json({
          success: false,
          message: `Unsupported agent: ${agent}`,
        });
      }
    }
  }
}