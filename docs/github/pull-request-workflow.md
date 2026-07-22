# GitHub Pull Request Workflow

## Purpose

This document describes the standard pull request workflow for the AI Agent Automation Platform.

## Workflow

### 1. Create a feature branch from `main`.
Example:
```bash
git checkout -b feature/AIAP-32-create-pr-workflow-documentation
```

### 2. Implement a single Jira subtask.
Example:
Complete AIAP-32.

### 3. Commit changes with a meaningful commit message.
Example:
```bash
git commit -m "AIAP-32 Create pull request workflow documentation"
```

### 4. Push the feature branch to GitHub.
Example:
```bash
git push -u origin feature/AIAP-32-create-pr-workflow-documentation
```

### 5. Open a pull request targeting `main`.
Example:
Create a PR from `feature/AIAP-32-create-pr-workflow-documentation` → `main`.

### 6. GitHub Actions automatically runs.
Example:
- Build ✅
- Lint ✅
- Tests ✅

### 7. Review the pull request.
Example:
Verify the code, documentation, and CI results.

### 8. Merge into `main` after all checks pass.
Example:
Click **Merge Pull Request**.

### 9. Delete the feature branch.
Example:
```bash
git branch -d feature/AIAP-32-create-pr-workflow-documentation
git push origin --delete feature/AIAP-32-create-pr-workflow-documentation
```

### 10. Pull the latest changes into the local `main` branch.
Example:
```bash
git checkout main
git pull origin main
```

## Branch Naming

Example:

```
feature/AIAP-32-create-pr-workflow-documentation
```

## Commit Message Example

```
AIAP-32 Create pull request workflow documentation
```