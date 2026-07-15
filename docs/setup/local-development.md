# Local Development Setup

This guide explains how to set up the AI Agent Automation Platform for local development.

## Prerequisites

Before you begin, install the following software:

- Node.js 20 or later
- npm
- Git

Verify your installation:

```bash
node -v
npm -v
git --version
```

## Clone the Repository

```bash
git clone <repository-url>
cd ai-agent-automation-platform
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a local environment file from the provided template.

```bash
cp .env.example .env
```

Update the environment variables as needed for your local setup.

## Build the Project

```bash
npm run build
```

## Run Unit Tests

```bash
npm test
```

## Start the Application

```bash
npm run dev
```

## Expected Result

If the setup completes successfully:

- Dependencies install without errors.
- The project builds successfully.
- Unit tests pass.
- The application starts in development mode.