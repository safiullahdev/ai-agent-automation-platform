import { beforeEach, describe, expect, it, vi } from "vitest";
import { AzureAIFoundryService } from "./AzureAIFoundryService.js";

describe("AzureAIFoundryService", () => {
  let service: AzureAIFoundryService;

  beforeEach(() => {
    service = new AzureAIFoundryService();
  });

  it("should initialize successfully", async () => {
    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);

    await service.initialize();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Azure AI Foundry initialized."
    );

    consoleSpy.mockRestore();
  });

  it("should process a prompt", async () => {
    const result = await service.processPrompt("Generate test cases");

    expect(result).toBe(
      "Azure AI Foundry processed: Generate test cases"
    );
  });
});