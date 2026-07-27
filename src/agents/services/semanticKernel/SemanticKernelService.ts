import { IAgentService } from "../agentFramework/IAgentService.js";

export class SemanticKernelService implements IAgentService {
  async initialize(): Promise<void> {
    console.log("Semantic Kernel initialized.");
  }

  async processRequest(input: string): Promise<string> {
    return `Semantic Kernel processed: ${input}`;
  }
}