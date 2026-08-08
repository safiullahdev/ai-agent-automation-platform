import { MicrosoftGraphService } from "../services/microsoftGraph/MicrosoftGraphService.js";

export interface EmailDraft {
  subject: string;
  body: string;
}

export class EmailAgent {
  constructor(
    private readonly graphService: MicrosoftGraphService
  ) {}

  async getCurrentUser() {
    return this.graphService.getUserProfile();
  }

  async getCalendarEvents() {
    return this.graphService.getCalendarEvents();
  }

  generateDraft(prompt: string): EmailDraft {
    return {
      subject: "Generated Email Draft",
      body: `Hello,

${prompt}

Thank you.`,
    };
  }
}