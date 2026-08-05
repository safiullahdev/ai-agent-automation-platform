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

  it("should route a manual test prompt", async () => {
    const response = await request(app)
      .post("/api/agents/execute")
      .send({
        prompt: "Generate manual test cases for login",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      result: {
        selectedAgent: "manual-test",
        message: "Request routed to the Manual Test Agent.",
      },
    });
  });

  it("should route a code review prompt", async () => {
    const response = await request(app)
      .post("/api/agents/execute")
      .send({
        prompt: "Review my code",
      });

    expect(response.status).toBe(200);
    expect(response.body.result.selectedAgent).toBe("code-review");
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