# AI Agent Automation Platform

A modular TypeScript platform for building, testing, and orchestrating specialized AI agents. The platform is designed to support scalable agent development, automation workflows, and future integrations with Microsoft AI technologies and cloud services.

## Overview

The AI Agent Automation Platform provides the foundation for developing specialized AI agents that automate software engineering, testing, documentation, and development workflows.

This project follows a modular architecture that allows agents to be developed, tested, and deployed independently while sharing common utilities and orchestration logic.

## Current Features

- Modular project structure
- TypeScript development environment
- GitHub Actions CI workflow
- Jenkins CI pipeline
- Environment configuration
- Documentation framework
- Unit testing structure
- Coordinator Agent
- Manual Test Generation Agent
- Email Agent
- Microsoft Agent Framework integration
- Microsoft Semantic Kernel integration
- Microsoft Graph service foundation
- Azure AI Foundry service foundation
- Express REST API
- Health check endpoint
- REST API routing
- Browser-based Web User Interface

## Planned AI Agents

### Implemented

- Coordinator Agent
- Manual Test Generation Agent
- Email Agent

### Planned

- Code Review Agent
- Documentation Agent

## Future Enhancements

The platform is designed to support future AI capabilities and integrations, including:

- Microsoft Copilot Studio
- GitHub Pull Request Automation
- Retrieval-Augmented Generation (RAG)
- Azure OpenAI Service

## Microsoft AI Services

Current service foundations:

- Microsoft Agent Framework
- Microsoft Semantic Kernel
- Microsoft Graph
- Azure AI Foundry

## Development Environment

### Recommended Tools

- Node.js 20+
- VS Code
- Git
- ESLint
- Prettier

Install dependencies:

```bash
npm install
```

## Technology Stack

- TypeScript
- Node.js
- Express
- Jenkins
- GitHub Actions
- Git
- REST APIs
- AI-assisted development tools

## Jenkins CI Pipeline

This project includes a Jenkins Declarative Pipeline for continuous integration.

### Pipeline Stages

1. Checkout – Clone the source code from GitHub.
2. Install Dependencies – Run `npm ci`.
3. Lint – Run `npm run lint`.
4. Build – Run `npm run build`.
5. Test – Run `npm test`.

### Running the Pipeline

1. Open Jenkins.
2. Select the **ai-agent-automation-platform** pipeline.
3. Click **Build Now**.
4. Review the Console Output.

A successful build finishes with:

```text
Finished: SUCCESS
```

A failed build finishes with:

```text
Finished: FAILURE
```

## Getting Started

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

Run ESLint:

```bash
npm run lint
```

Create a local environment configuration:

```bash
cp .env.example .env
```

For complete setup instructions, see:

- [Local Development Setup](docs/setup/local-development.md)

---

# REST API

The AI Agent Automation Platform exposes a REST API for executing AI agents.

## Start the API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API runs at:

```text
http://localhost:3000
```

## Endpoints

### GET /

Serves the browser-based Web UI.

### GET /health

Returns the API health status.

Example:

```json
{
  "status": "UP"
}
```

### GET /api/agents

Returns API information.

Example:

```json
{
  "message": "Agent API"
}
```

### POST /api/agents/execute

Routes a prompt to the appropriate AI agent using the Coordinator Agent.

Example request:

```json
{
  "prompt": "Generate manual test cases for login"
}
```

Example response:

```json
{
  "success": true,
  "result": {
    "selectedAgent": "manual-test",
    "message": "Request routed to the Manual Test Agent."
  }
}
```

## REST API Flow

```text
Client
   │
HTTP Request
   │
Express Server
   │
Middleware
   │
Routes
   │
Controller
   │
Coordinator Agent
   │
Routing Response
```

---

# Web User Interface

The AI Agent Automation Platform includes a browser-based interface for interacting with AI agents.

## Features

- Select an AI agent
- Enter a prompt
- Execute requests through the REST API
- View JSON responses
- Loading indicator
- Error handling

## Running the Web UI

Start the application:

```bash
npm run dev
```

or

```bash
npm start
```

Open your browser:

```text
http://localhost:3000
```

## Example

### Selected Agent

```text
Coordinator Agent
```

### Prompt

```text
Generate manual test cases for login
```

### Example Response

```json
{
  "success": true,
  "result": {
    "selectedAgent": "manual-test",
    "message": "Request routed to the Manual Test Agent."
  }
}
```

## Web UI Flow

```text
Browser
    │
    ▼
Web UI
    │
    ▼
REST API
    │
    ▼
Coordinator Agent
    │
    ▼
Specialized AI Agent
```

---

# Testing

The application can be verified using:

- Vitest
- Supertest
- curl
- Postman Desktop

Run all automated tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```

---

# Documentation

- [Project Structure](docs/architecture/project-structure.md)
- [Architecture Documentation](docs/architecture/README.md)
- [Setup Documentation](docs/setup/README.md)

---

# Project Status

🚧 This project is currently under active development.

Current capabilities include:

- Coordinator Agent
- Manual Test Generation Agent
- Email Agent
- REST API
- Browser-based Web UI
- GitHub Actions CI
- Jenkins CI Pipeline
- Microsoft Agent Framework integration
- Microsoft Semantic Kernel integration
- Microsoft Graph service foundation
- Azure AI Foundry service foundation

Future iterations will introduce additional AI agents, workflow orchestration, drag-and-drop automation, Microsoft AI integrations, and automated software engineering capabilities.