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

## Planned AI Agents

Implemented:

- Coordinator Agent
- Manual Test Generation Agent
- Email Agent

Planned:

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

Recommended tools:

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
- Jenkins
- GitHub Actions
- Git
- REST APIs
- AI-assisted development tools

## Jenkins CI Pipeline

This project includes a Jenkins Declarative Pipeline for continuous integration.

### Pipeline Stages

1. Checkout – Clones the source code from GitHub.
2. Install Dependencies – Runs `npm ci` to install project dependencies.
3. Lint – Runs `npm run lint` to validate code quality using ESLint.
4. Build – Runs `npm run build` to compile the TypeScript project.
5. Test – Runs `npm test` to execute the Vitest test suite.

### Running the Pipeline

1. Open Jenkins.
2. Select the `ai-agent-automation-platform` pipeline job.
3. Click **Build Now**.
4. View the Console Output to monitor each stage and verify the build result.

A successful pipeline finishes with:

```text
Finished: SUCCESS
```

If any stage fails, Jenkins stops the pipeline and marks the build as:

```text
Finished: FAILURE
```

## Getting Started

Install project dependencies.

```bash
npm install
```

Build the project.

```bash
npm run build
```

Run unit tests.

```bash
npm test
```

Create a local environment configuration.

```bash
cp .env.example .env
```

For complete setup instructions, see:

- [Local Development Setup](docs/setup/local-development.md)

## Documentation

- [Project Structure](docs/architecture/project-structure.md)
- [Architecture Documentation](docs/architecture/README.md)
- [Setup Documentation](docs/setup/README.md)

## Project Status

🚧 This project is currently under active development.

The initial project foundation has been completed. Future iterations will introduce AI agent implementations, workflow orchestration, Microsoft AI integrations, and automated software engineering capabilities.