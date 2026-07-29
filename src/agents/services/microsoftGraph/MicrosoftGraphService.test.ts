import { describe, expect, it, vi } from "vitest";
import { MicrosoftGraphService } from "./MicrosoftGraphService.js";
import { MicrosoftGraphConfig } from "./MicrosoftGraphConfig.js";

describe("MicrosoftGraphService", () => {
  const config: MicrosoftGraphConfig = {
    tenantId: "test-tenant-id",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  };

  it("should initialize the Microsoft Graph service", async () => {
    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);

    const service = new MicrosoftGraphService(config);

    await service.initialize();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Microsoft Graph service initialized for tenant: test-tenant-id"
    );

    consoleSpy.mockRestore();
  });

  it("should return a mock user profile", async () => {
    const service = new MicrosoftGraphService(config);

    const userProfile = await service.getUserProfile();

    expect(userProfile).toEqual({
      id: "user-001",
      displayName: "Demo User",
      email: "demo@example.com",
    });
  });

  it("should return mock calendar events", async () => {
    const service = new MicrosoftGraphService(config);

    const events = await service.getCalendarEvents();

    expect(events).toHaveLength(1);

    expect(events[0]).toEqual({
      id: "event-001",
      subject: "Sprint Planning",
      startTime: "2026-07-28T10:00:00",
      endTime: "2026-07-28T11:00:00",
    });
  });

  it("should create the service with valid configuration", () => {
    const service = new MicrosoftGraphService(config);

    expect(service).toBeInstanceOf(MicrosoftGraphService);
  });
});