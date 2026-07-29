import {
  CoordinatorRequest,
  CoordinatorResponse,
} from "./coordinatorTypes.js";

export class CoordinatorAgent {
  route(request: CoordinatorRequest): CoordinatorResponse {
    const prompt = request.prompt.toLowerCase();

    if (prompt.includes("review") || prompt.includes("code")) {
      return {
        selectedAgent: "code-review",
        message: "Request routed to the Code Review Agent.",
      };
    }

    if (prompt.includes("documentation") || prompt.includes("document")) {
      return {
        selectedAgent: "documentation",
        message: "Request routed to the Documentation Agent.",
      };
    }

    if (
      prompt.includes("test case") ||
      prompt.includes("manual test") ||
      prompt.includes("testing")
    ) {
      return {
        selectedAgent: "manual-test",
        message: "Request routed to the Manual Test Agent.",
      };
    }

    if (
      prompt.includes("email") ||
      prompt.includes("calendar") ||
      prompt.includes("profile")
    ) {
      return {
        selectedAgent: "email-agent",
        message: "Request routed to the Email Agent.",
      };
    }

    return {
      selectedAgent: "unknown",
      message: "No matching agent was found.",
    };
  }
}