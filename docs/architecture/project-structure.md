# Project Structure

```text
ai-agent-automation-platform/
├── .github/workflows/
├── agents/
│   ├── coordinator-agent/
│   ├── manual-test-agent/
│   ├── code-review-agent/
│   └── documentation-agent/
├── api/
├── workflows/
├── prompts/
├── shared/
├── config/
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   └── setup/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
├── examples/
├── playground/
├── src/
├── package.json
├── tsconfig.json
├── .gitignore
├── .env.example
└── README.md
```

## Design Principles

1. Keep each agent independently testable.
2. Separate orchestration from agent-specific logic.
3. Keep prompts version controlled.
4. Centralize shared configuration and utilities.
5. Support future Microsoft and Azure integrations without major restructuring.
