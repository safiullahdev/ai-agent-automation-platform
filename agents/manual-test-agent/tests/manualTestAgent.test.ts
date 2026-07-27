import { describe, expect, it } from "vitest";
import { ManualTestAgent } from "../src/manualTestAgent.js";
import { SemanticKernelService } from "../../../src/agents/services/semanticKernel/SemanticKernelService.js";
import { AgentFrameworkService } from "../../../src/agents/services/agentFramework/AgentFrameworkService.js";

it("should send a test generation request to Semantic Kernel", async () => {
  const semanticKernelService = new SemanticKernelService();
  const agent = new ManualTestAgent(semanticKernelService);

  const response = await agent.generateWithAI({
    featureDescription: "user login"
  });

  expect(response).toBe(
    "Semantic Kernel processed: Generate manual test cases for: user login"
  );
});

it("should send a request through Agent Framework Service", async () => {
  const agentFrameworkService = new AgentFrameworkService();
  const agent = new ManualTestAgent(agentFrameworkService);

  const response = await agent.generateWithAI({
    featureDescription: "user login"
  });

  expect(response).toBe(
    "Received request: Generate manual test cases for: user login"
  );
});

describe("ManualTestAgent", () => {
  const agent = new ManualTestAgent();

  it("generates four test cases for a valid feature description", () => {
    const response = agent.generate({
      featureDescription: "login"
    });

    expect(response.featureDescription).toBe("login");
    expect(response.testCases).toHaveLength(4);
    expect(response.message).toBeUndefined();
  });

  it("generates positive, negative, validation, and boundary tests", () => {
    const response = agent.generate({
      featureDescription: "login"
    });

    const testTypes = response.testCases.map(
      (testCase) => testCase.testType
    );

    expect(testTypes).toContain("Positive");
    expect(testTypes).toContain("Negative");
    expect(testTypes).toContain("Validation");
    expect(testTypes).toContain("Boundary");
  });

  it("returns complete manual test-case details", () => {
    const response = agent.generate({
      featureDescription: "login"
    });

    const firstTestCase = response.testCases[0];

    expect(firstTestCase).toBeDefined();

    if (!firstTestCase) {
      throw new Error("Expected at least one generated test case.");
    }

    expect(firstTestCase.title).toBeTruthy();
    expect(firstTestCase.preconditions.length).toBeGreaterThan(0);
    expect(firstTestCase.steps.length).toBeGreaterThan(0);
    expect(firstTestCase.expectedResult).toBeTruthy();
    expect(firstTestCase.priority).toBe("High");
    expect(firstTestCase.testType).toBe("Positive");
  });

  it("returns a fallback response for an empty feature description", () => {
    const response = agent.generate({
      featureDescription: ""
    });

    expect(response.featureDescription).toBe("");
    expect(response.testCases).toEqual([]);
    expect(response.message).toBe(
      "Please provide a feature description."
    );
  });

  it("returns a fallback response for whitespace-only input", () => {
    const response = agent.generate({
      featureDescription: "   "
    });

    expect(response.featureDescription).toBe("");
    expect(response.testCases).toEqual([]);
    expect(response.message).toBe(
      "Please provide a feature description."
    );
  });

  it("trims extra spaces from a valid feature description", () => {
    const response = agent.generate({
      featureDescription: "  user login  "
    });
    console.log(JSON.stringify(response, null, 2));


    expect(response.featureDescription).toBe("user login");
    expect(response.testCases).toHaveLength(4);
  });
});