import { describe, it, expect, beforeEach } from "vitest";
import { EmailAgent } from "./EmailAgent.js";
import { MicrosoftGraphService } from "../services/microsoftGraph/MicrosoftGraphService.js";

describe("EmailAgent", () => {
  let agent: EmailAgent;

  beforeEach(() => {
    const graphService = new MicrosoftGraphService({
      tenantId: "demo",
      clientId: "demo",
      clientSecret: "demo",
    });

    agent = new EmailAgent(graphService);
  });

  it("should retrieve the current user profile", async () => {
    const user = await agent.getCurrentUser();

    expect(user).toBeDefined();
    expect(user.id).toBe("user-001");
    expect(user.displayName).toBe("Demo User");
    expect(user.email).toBe("demo@example.com");
  });

  it("should retrieve calendar events", async () => {
    const events = await agent.getCalendarEvents();

    expect(events).toHaveLength(1);
    expect(events[0].id).toBe("event-001");
    expect(events[0].subject).toBe("Sprint Planning");
  });
});