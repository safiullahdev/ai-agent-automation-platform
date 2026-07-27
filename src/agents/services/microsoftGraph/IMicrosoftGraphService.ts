import {
  GraphCalendarEvent,
  GraphUserProfile,
} from "./MicrosoftGraphTypes.js";

export interface IMicrosoftGraphService {
  initialize(): Promise<void>;
  getUserProfile(): Promise<GraphUserProfile>;
  getCalendarEvents(): Promise<GraphCalendarEvent[]>;
}