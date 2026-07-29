export type AgentType =
  | "code-review"
  | "documentation"
  | "manual-test"
  | "email-agent"
  | "unknown";

export interface CoordinatorRequest {
  prompt: string;
}

export interface CoordinatorResponse {
  selectedAgent: AgentType;
  message: string;
}