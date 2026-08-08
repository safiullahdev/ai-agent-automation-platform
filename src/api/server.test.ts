import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./server.js";

describe("API Server", () => {
  it("should return API health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "UP",
    });
  });

  it("should return Agent API information", async () => {
    const response = await request(app).get("/api/agents");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Agent API",
    });
  });

it("should route a manual test prompt through the coordinator", async () => {
  const response = await request(app)
    .post("/api/agents/execute")
    .send({
      agent: "coordinator",
      prompt: "Generate manual test cases for login",
    });

  expect(response.status).toBe(200);
  expect(response.body.requestedAgent).toBe("coordinator");
  expect(response.body.executedAgent).toBe("manual-test");
  expect(response.body.data.featureDescription).toBe(
    "Generate manual test cases for login"
  );
  expect(response.body.data.testCases).toBeDefined();
});

it("should route a code review prompt through the coordinator", async () => {
  const response = await request(app)
    .post("/api/agents/execute")
    .send({
      agent: "coordinator",
      prompt: "Review my code",
    });

  expect(response.status).toBe(200);
  expect(response.body.requestedAgent).toBe("coordinator");
  expect(response.body.executedAgent).toBe("code-review");
});

  it("should return 400 when prompt is missing", async () => {
    const response = await request(app)
      .post("/api/agents/execute")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Prompt is required",
    });
  });

  it("should serve the web UI from the root route", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("AI Agent Automation Platform");
    expect(response.text).toContain("Run Agent");
  });

  it("should serve the web UI JavaScript file", async () => {
    const response = await request(app).get("/app.js");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("javascript");
    expect(response.text).toContain(
      'document.getElementById("run-agent-button")'
    );
  });

  it("should serve the web UI stylesheet", async () => {
    const response = await request(app).get("/styles.css");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/css");
    expect(response.text).toContain("#response-output");
  });
});