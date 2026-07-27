export interface MicrosoftGraphRequest {
  operation: string;
}

export interface GraphUserProfile {
  id: string;
  displayName: string;
  email: string;
}

export interface GraphCalendarEvent {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
}