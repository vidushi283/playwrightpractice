# Project

## Ticket Adapter
**Status**: configured
**Adapter**: Atlassian MCP tools (Jira, site epampractice.atlassian.net, project SCRUM)
**Lookup**: `mcp__atlassian__getJiraIssue` with cloudId `epampractice.atlassian.net` and the issue key

## Test Management Adapter
**Status**: configured
**System**: Jira
**Adapter**: Atlassian MCP tools
**Sync Command**: `mcp__atlassian__createJiraIssue` with issue type Subtask (ID 10002), `parent` set to the ticket under test, test steps and expected results in the description
