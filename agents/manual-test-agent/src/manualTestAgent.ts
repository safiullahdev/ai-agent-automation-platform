import {
  ManualTestCase,
  ManualTestRequest,
  ManualTestResponse
} from "./manualTestTypes.js";

import { IAgentService } from "../../../src/agents/services/agentFramework/IAgentService.js";

export class ManualTestAgent {

  constructor(private readonly aiService?: IAgentService) {}

  generate(request: ManualTestRequest): ManualTestResponse {
    const feature = request.featureDescription.trim();

    if (!feature) {
      return {
        featureDescription: "",
        testCases: [],
        message: "Please provide a feature description."
      };
    }

    const testCases: ManualTestCase[] = [
      {
        title: `Verify successful ${feature}`,
        preconditions: [
          "User has valid test data",
          "User is on the correct application page"
        ],
        steps: [
          `Open the ${feature} page`,
          "Enter valid data",
          "Submit the request"
        ],
        expectedResult: `${feature} is completed successfully`,
        priority: "High",
        testType: "Positive"
      },
      {
        title: `Verify ${feature} with invalid data`,
        preconditions: [
          "User is on the correct application page"
        ],
        steps: [
          `Open the ${feature} page`,
          "Enter invalid data",
          "Submit the request"
        ],
        expectedResult: "An appropriate error message is displayed",
        priority: "High",
        testType: "Negative"
      },
      {
        title: `Verify ${feature} with empty required fields`,
        preconditions: [
          "User is on the correct application page"
        ],
        steps: [
          `Open the ${feature} page`,
          "Leave required fields empty",
          "Submit the request"
        ],
        expectedResult: "Required field validation messages are displayed",
        priority: "Medium",
        testType: "Validation"
      },
      {
        title: `Verify ${feature} boundary values`,
        preconditions: [
          "User is on the correct application page"
        ],
        steps: [
          `Open the ${feature} page`,
          "Enter minimum and maximum allowed values",
          "Submit the request"
        ],
        expectedResult: "Boundary values are handled correctly",
        priority: "Medium",
        testType: "Boundary"
      }
    ];

    return {
      featureDescription: feature,
      testCases
    };
  }

async generateWithAI(request: ManualTestRequest): Promise<string> {
  const feature = request.featureDescription.trim();

  console.log("ManualTestAgent received:", feature);

  const prompt = `Generate manual test cases for: ${feature}`;

  console.log("ManualTestAgent sending to Semantic Kernel:", prompt);

  const response = await this.aiService!.processRequest(prompt);

  console.log("ManualTestAgent received back:", response);

  return response;
}
}