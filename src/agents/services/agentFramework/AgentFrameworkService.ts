import { IAgentService } from "./IAgentService.js";

export class AgentFrameworkService implements IAgentService {
  async initialize(): Promise<void> {
    console.log("Microsoft Agent Framework initialized.");
  }

  async processRequest(input: string): Promise<string> {
    return `Received request: ${input}`;
  }
}