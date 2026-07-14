import { describe, expect, it } from "vitest";
import { getPlatformStatus } from "../../src/index.js";

describe("getPlatformStatus", () => {
  it("returns the initialized platform status", () => {
    expect(getPlatformStatus()).toBe(
      "AI Agent Automation Platform initialized successfully."
    );
  });
});
