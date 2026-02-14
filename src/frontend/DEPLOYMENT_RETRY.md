# Deployment Retry Guide

## Purpose
This document describes how to retry a build/deployment when encountering transient platform failures.

## When to Use This
- Deployment fails with generic "technical snafu" or platform errors
- No code changes are needed
- Previous deployments were successful with the same codebase

## How to Retry Deployment

### Method 1: Request a Retry
Simply ask the AI assistant to "retry" or "rebuild" the application. The assistant will trigger a new build using the current repository state without requiring any code modifications.

### Method 2: Manual Trigger (if available)
If your platform provides a manual deployment trigger:
1. Navigate to your deployment dashboard
2. Click "Redeploy" or "Retry Build" button
3. Wait for the build process to complete

## Capturing Logs on Failure

If the retry fails again, capture the following information:

### Build Logs
- Full console output from the build process
- Any error messages or stack traces
- Timestamp of the failure

### Deployment Logs
- Deployment service output
- Network errors or timeout messages
- Canister deployment status (if applicable)

### Environment Information
- Node.js version
- npm/pnpm version
- dfx version (for Internet Computer deployments)
- Operating system

## Sharing Logs for Diagnosis

When reporting a persistent deployment failure:
1. Copy the complete build/deploy output (not just the error summary)
2. Include the last 50-100 lines before the failure
3. Note any warnings that appeared during the build
4. Share the full error message and stack trace

## Common Transient Issues

These typically resolve on retry:
- Network timeouts during dependency installation
- Temporary service unavailability
- Rate limiting on external services
- Canister deployment queue delays

## When It's Not Transient

If retries consistently fail, the issue may be code-related. Check for:
- Syntax errors in TypeScript/React code
- Missing dependencies in package.json
- Invalid configuration in vite.config.js or tsconfig.json
- Backend canister compilation errors
- Type mismatches between frontend and backend interfaces

In these cases, review the error logs carefully and address the specific code issues before retrying.
