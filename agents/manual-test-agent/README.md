# Manual Test Agent

## Purpose

The Manual Test Agent generates manual test cases from a feature description.

## Features

- Accepts a feature description
- Generates positive test cases
- Generates negative test cases
- Generates validation test cases
- Generates boundary test cases
- Validates empty input

## Request

```ts
{
  featureDescription: "User Login"
}
```

## Response

```ts
{
  featureDescription: "User Login",
  testCases: [
    ...
  ]
}
```

## Example

Input:

```text
User Login
```

Output:

- Verify successful User Login
- Verify User Login with invalid data
- Verify User Login with empty required fields
- Verify User Login boundary values

## Running Tests

```bash
npm test
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```