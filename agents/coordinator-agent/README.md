# Coordinator Agent

## Purpose

The Coordinator Agent is the entry point for the AI Agent Automation Platform. It receives user requests, identifies the request type, and routes the request to the appropriate specialized agent.

## Responsibilities

- Receive user requests
- Determine the request type
- Route requests to the correct agent
- Return a routing response

## Supported Agents

- Code Review Agent
- Documentation Agent
- Manual Test Agent

## Routing Logic

The current implementation uses simple keyword-based routing.

Examples:

- "Review this Java code" → Code Review Agent
- "Create API documentation" → Documentation Agent
- "Generate test cases" → Manual Test Agent

Unknown requests return the `unknown` agent type.

## Future Enhancements

- AI-powered intent detection
- Dynamic agent registration
- Multi-agent workflows