import { IMicrosoftGraphService } from "./IMicrosoftGraphService.js";

export class MicrosoftGraphService implements IMicrosoftGraphService {
  async initialize(): Promise<void> {
    console.log("Microsoft Graph service initialized.");
  }
}