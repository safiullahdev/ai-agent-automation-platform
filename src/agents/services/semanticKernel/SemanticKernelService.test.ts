import { describe, expect, it } from "vitest";
import { SemanticKernelService } from "./SemanticKernelService.js";

describe("SemanticKernelService", () => {
  it("should initialize", async () => {
    const service = new SemanticKernelService();

    await service.initialize();

    expect(service).toBeDefined();
  });

  it("should process a request", async () => {
    const service = new SemanticKernelService();

    const response = await service.processRequest("Hello");

    expect(response).toBe("Semantic Kernel processed: Hello");
  });
});