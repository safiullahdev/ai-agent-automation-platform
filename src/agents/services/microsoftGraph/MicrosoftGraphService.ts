import { IMicrosoftGraphService } from "./IMicrosoftGraphService.js";
import {
  GraphCalendarEvent,
  GraphUserProfile,
} from "./MicrosoftGraphTypes.js";
import { MicrosoftGraphConfig } from "./MicrosoftGraphConfig.js";

export class MicrosoftGraphService implements IMicrosoftGraphService {
  constructor(private readonly config: MicrosoftGraphConfig) {}

  async initialize(): Promise<void> {
    console.log(
      `Microsoft Graph service initialized for tenant: ${this.config.tenantId}`
    );
  }

  async getUserProfile(): Promise<GraphUserProfile> {
    return {
      id: "user-001",
      displayName: "Demo User",
      email: "demo@example.com",
    };
  }

  async getCalendarEvents(): Promise<GraphCalendarEvent[]> {
    return [
      {
        id: "event-001",
        subject: "Sprint Planning",
        startTime: "2026-07-28T10:00:00",
        endTime: "2026-07-28T11:00:00",
      },
    ];
  }
}