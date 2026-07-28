import { MicrosoftGraphService } from "../services/microsoftGraph/MicrosoftGraphService.js";

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
}