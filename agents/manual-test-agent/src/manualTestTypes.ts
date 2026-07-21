export type TestPriority = "Low" | "Medium" | "High";

export type TestType =
  | "Positive"
  | "Negative"
  | "Boundary"
  | "Validation";

export interface ManualTestRequest {
  featureDescription: string;
}

export interface ManualTestCase {
  title: string;
  preconditions: string[];
  steps: string[];
  expectedResult: string;
  priority: TestPriority;
  testType: TestType;
}

export interface ManualTestResponse {
  featureDescription: string;
  testCases: ManualTestCase[];
  message?: string;
}