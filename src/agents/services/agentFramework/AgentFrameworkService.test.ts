import { describe, it, expect } from "vitest";
import { AgentFrameworkService } from "./AgentFrameworkService.js";

describe("AgentFrameworkService", () => {
  it("should initialize the agent service", async () => {
    const service = new AgentFrameworkService();

    await service.initialize();

    expect(service).toBeDefined();
  });
});