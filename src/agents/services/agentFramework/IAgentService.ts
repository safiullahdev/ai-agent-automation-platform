export interface IAgentService {
  initialize(): Promise<void>;
  processRequest(input: string): Promise<string>;
}