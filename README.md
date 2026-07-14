# AI Agent Automation Platform

A modular TypeScript platform for building, testing, and orchestrating specialized AI agents.

## Initial Scope

This repository currently provides the project foundation:

- Scalable folder structure
- TypeScript configuration
- Environment-variable template
- GitHub Actions CI workflow
- Agent placeholders
- Testing directories
- Architecture and setup documentation

## Planned Agents

- Coordinator Agent
- Manual Test Generation Agent
- Code Review Agent
- Documentation Agent

## Future Integrations

The architecture is prepared for future integrations such as:

- Microsoft Semantic Kernel
- Azure AI Foundry
- Microsoft Graph
- Microsoft Copilot Studio
- GitHub pull-request automation
- Retrieval-Augmented Generation (RAG)

## Getting Started

```bash
npm install
npm run build
npm test
```

Copy the environment template before local development:

```bash
cp .env.example .env
```

## Project Structure

See [docs/architecture/project-structure.md](docs/architecture/project-structure.md).
