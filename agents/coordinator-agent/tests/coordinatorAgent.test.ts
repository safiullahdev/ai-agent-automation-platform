import { describe, expect, it } from "vitest";
import { CoordinatorAgent } from "../src/coordinatorAgent.js";
describe("CoordinatorAgent", () => {
  const coordinator = new CoordinatorAgent();

  it("routes code review requests to the Code Review Agent", () => {
    const response = coordinator.route({
      prompt: "Review this Java code",
    });

    expect(response.selectedAgent).toBe("code-review");
  });

  it("routes documentation requests to the Documentation Agent", () => {
    const response = coordinator.route({
      prompt: "Create API documentation",
    });

    expect(response.selectedAgent).toBe("documentation");
  });

  it("routes testing requests to the Manual Test Agent", () => {
    const response = coordinator.route({
      prompt: "Generate test cases",
    });

    expect(response.selectedAgent).toBe("manual-test");
  });

  it("returns unknown when no agent matches", () => {
    const response = coordinator.route({
      prompt: "Hello, how are you?",
    });

    expect(response.selectedAgent).toBe("unknown");
  });
});