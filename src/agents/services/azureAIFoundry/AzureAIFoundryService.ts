import { IAzureAIFoundryService } from "./IAzureAIFoundryService.js";

export class AzureAIFoundryService implements IAzureAIFoundryService {
  async initialize(): Promise<void> {
    console.log("Azure AI Foundry initialized.");
  }

  async processPrompt(prompt: string): Promise<string> {
    return `Azure AI Foundry processed: ${prompt}`;
  }
}