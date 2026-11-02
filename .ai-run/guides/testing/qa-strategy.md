# QA Strategy

**Last assessed**: 2026-11-02

## Test Frameworks

| Framework | Type | Config file | Test directories |
|---|---|---|---|
| Playwright (@playwright/test ^1.64.1, TypeScript) | e2e | playwright.config.ts | tests/ |

## Test Types in Use

### Unit Tests
- **Location**: none detected
- **Pattern**: n/a
- **Run command**: n/a

### Integration Tests
- **Location**: none detected
- **Pattern**: n/a
- **Run command**: n/a

### End-to-End Tests
- **Location**: tests/
- **Tool**: playwright
- **Run command**: `npm test` (headed: `npm run test:headed`; report: `npm run report`; types: `npm run typecheck`)
- **Example**: `tests/login.spec.ts:5`

## Coverage Targets

- **Line coverage target**: not configured
- **Branch coverage target**: not configured
- **Coverage command**: not configured

## Conventions

- **Test file naming**: `*.spec.ts` in `tests/`
- **Test file location**: in tests/ directory
- **Test style**: `test.describe` with `test()` blocks; assertions via `expect(...).toBeVisible()` / `toHaveURL`
- **Source docs scanned**: README.md
- **Naming / selector conventions (from docs)**: locators by id (`#user-name`, `#login-button`) and `[data-test="error"]`; locators are private readonly fields on page objects
- **Architecture notes (from docs)**: Page Object Model - `pages/BasePage`, `LoginPage`, `InventoryPage`; `fixtures/index.ts` extends Playwright `test` to provide page objects; static data in `test-data/`; `utils/env.ts` reads `SAUCE_USERNAME` / `SAUCE_PASSWORD` (default public demo credentials)
- **Testing guidance (from docs)**: locators may need adjusting if the site changes; no dotenv, set credentials via shell variables

### Manual / API test case format (for qa-case-generator)

- **Test format**: structured_steps (numbered steps, one action and one expected result per step)
- **Placeholder format**: angle_brackets (`<username>`, `<password>`)
- **Test case ID format**: `{TICKET_ID}_TC_001`, `{TICKET_ID}_TC_002`, ...
- **Manual test template sections**: Preconditions, Steps, Expected Result, Notes
- **API test template sections**: Endpoint, Headers, Request Body, Expected Response, Notes

## Anti-Patterns (observed in this codebase)

| Bad | Better | Why |
|---|---|---|
| none observed | n/a | n/a |

## Code Repositories

Application/feature source repositories that will be tested (not test-only repos). Recorded for
qa-e2e-generator to search merge requests/commits by ticket ID - not scanned for conventions.

- **current**: https://github.com/vidushi283/playwrightpractice.git

## External Sources

### Test Case Management
- **System**: Jira (site epampractice.atlassian.net, project SCRUM "QATesting")
- **Adapter**: Atlassian MCP tools

#### Schema (discovered from project metadata; no existing test cases)

**Test Case Structure:**
- **Type name**: Subtask (ID: 10002), created as a child of the ticket under test
- **Required fields**:
  - `Summary` (ID: `summary`, type: string)
  - `Parent` (ID: `parent`, type: issuelink): the ticket under test
  - `Project` (ID: `project`, type: project)
  - `Reporter` (ID: `reporter`, type: user): has a default value
  - `Issue Type` (ID: `issuetype`, type: issuetype)
- **Optional fields**: `Description` (`description`), `Labels` (`labels`), `Assignee` (`assignee`), `Attachment` (`attachment`)
- **Custom fields in use**: none for test management. No test-step, expected-result or priority fields exist; put them in Description.
- **Link types**: Blocks (ID: 10000), Cloners (ID: 10001), Duplicate (ID: 10002), Relates (ID: 10003). None are test-specific.

**Test Execution Structure**: none

> **Note:** This schema was extracted from project metadata on 2026-11-02 (no example test case existed). If the project gains a dedicated test issue type, re-run qa-foundation to refresh.

### QA Documentation
- **System**: none
- **Adapter**: not configured
- **Paths**: n/a

### External Test Repositories
none
