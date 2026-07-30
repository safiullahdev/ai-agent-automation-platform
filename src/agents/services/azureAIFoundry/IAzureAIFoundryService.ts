export interface IAzureAIFoundryService {
  initialize(): Promise<void>;

  processPrompt(prompt: string): Promise<string>;
}