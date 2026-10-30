# Playwright (TypeScript) Scaffold for saucedemo.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a small TypeScript Playwright project for https://www.saucedemo.com/ in the empty repo root, with one sample login test that goes through a page object.

**Architecture:** Page Object Model. `pages/` holds `BasePage` plus `LoginPage` and `InventoryPage`; `fixtures/` extends Playwright's `test` to provide page objects; `test-data/` holds the public credentials; `utils/` holds a small env helper; `tests/` holds specs.

**Tech Stack:** Node v22 / npm 10, `@playwright/test`, `typescript`, `@types/node`.

**Spec:** none (inline requirements); see Acceptance criteria. Technical analysis: `technical-analysis.md` in this directory (greenfield repo, no conventions to follow).

Commit per task using the repository's existing convention. The repo has no commits yet, so the calling flow decides; this run must NOT commit.

## Acceptance criteria

- [ ] `package.json` declares `@playwright/test` and `typescript` as devDependencies and has `test`, `test:headed`, `report` and `typecheck` scripts.
- [ ] `playwright.config.ts` sets `baseURL` to `https://www.saucedemo.com`, `testDir` to `./tests`, html + list reporters, and a single `chromium` project.
- [ ] `tsconfig.json` exists and `npx tsc --noEmit` passes.
- [ ] `.gitignore` ignores `node_modules`, `test-results`, `playwright-report`, `.env` (and `blob-report`, `playwright/.cache`).
- [ ] Folders exist with content: `tests/`, `pages/` (`BasePage`, `LoginPage`, `InventoryPage`), `fixtures/`, `test-data/`, `utils/`.
- [ ] `test-data/users.ts` holds the public `standard_user` / `secret_sauce` credentials.
- [ ] `tests/login.spec.ts` contains a successful-login test that uses a page object (via the fixture) and an invalid-login test asserting the error banner.
- [ ] `README.md` briefly describes the structure, install steps (including the manual `npx playwright install`) and how to run tests.
- [ ] No CI config is added and nothing is committed.

## Global Constraints

- Language: TypeScript (user-confirmed). Keep the scaffold small.
- Base URL: `https://www.saucedemo.com`. Credentials: `standard_user` / `secret_sauce` (public demo credentials).
- Locators (public knowledge, NOT verified in this run): `#user-name`, `#password`, `#login-button`, `.inventory_list`, `[data-test=error]`.
- `npx playwright install` (browser download) is a documented manual step, not part of any task.
- Out of scope: CI config, quality-gate/lint/browser-verification tasks, commits.

## Review Focus

- Wrong password or empty fields: error banner visible, URL stays on login page (covered in Task 2 invalid-login test).
- Missing optional env overrides: helper falls back to `test-data` credentials (covered by Task 2 typecheck + default run).
- Fresh clone without `npx playwright install`: README states the step before the run command (Task 4).
- Generated artifacts (`test-results/`, `playwright-report/`, `node_modules/`) never appear in `git status` (Task 1 verification).

---

### Task 1: Tooling config (package.json, tsconfig, .gitignore, playwright.config)

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore`, `playwright.config.ts`

**Interfaces:**
- Produces: npm scripts `test` (`playwright test`), `test:headed` (`playwright test --headed`), `report` (`playwright show-report`), `typecheck` (`tsc --noEmit`); default export `defineConfig(...)` from `playwright.config.ts`.

Test-first: no — config-only task; verified by `npx tsc --noEmit` and `npx playwright test --list`, not a behavioral test.

- [ ] **Step 1: Create the four files and install deps**
  - `package.json`: `private: true`, `name: saucedemo-playwright`, the four scripts above; run `npm install -D @playwright/test typescript @types/node` to populate devDependencies and the lockfile.
  - `tsconfig.json`: `target ES2022`, `module commonjs`, `strict: true`, `esModuleInterop: true`, `resolveJsonModule: true`, `include` the root `*.ts` plus `tests`, `pages`, `fixtures`, `test-data`, `utils`.
  - `.gitignore`: `node_modules/`, `test-results/`, `playwright-report/`, `blob-report/`, `playwright/.cache/`, `.env`, `.env.*`.
  - `playwright.config.ts`: `testDir: './tests'`, `fullyParallel: true`, `reporter: [['list'], ['html', { open: 'never' }]]`, `use: { baseURL: 'https://www.saucedemo.com', trace: 'on-first-retry', screenshot: 'only-on-failure' }`, `projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]`.
- [ ] **Step 2: Verify**
  Run: `npx tsc --noEmit` — Expected: exit 0 (no inputs yet may report "no inputs"; if so, defer to Task 2).
  Run: `npx playwright test --list` — Expected: runs without config errors ("No tests found" is acceptable at this point).
  Run: `git status --short` — Expected: `node_modules/` not listed.

---

### Task 2: Test data, env helper, page objects and sample login spec

**Files:**
- Create: `test-data/users.ts`, `utils/env.ts`, `pages/BasePage.ts`, `pages/LoginPage.ts`, `pages/InventoryPage.ts`
- Test: `tests/login.spec.ts`

**Interfaces:**
- Produces:
  - `test-data/users.ts`: `export const standardUser: { username: string; password: string }` (`standard_user` / `secret_sauce`).
  - `utils/env.ts`: `export function getCredentials(): { username: string; password: string }` — returns `SAUCE_USERNAME`/`SAUCE_PASSWORD` from `process.env` when both set, else `standardUser`.
  - `pages/BasePage.ts`: `export abstract class BasePage { constructor(protected readonly page: Page); goto(path: string): Promise<void> }`.
  - `pages/LoginPage.ts`: `export class LoginPage extends BasePage { open(): Promise<void>; login(username: string, password: string): Promise<void>; readonly errorMessage: Locator }` — locators `#user-name`, `#password`, `#login-button`, `[data-test="error"]`.
  - `pages/InventoryPage.ts`: `export class InventoryPage extends BasePage { readonly inventoryList: Locator }` — locator `.inventory_list`.

Test-first: yes — `tests/login.spec.ts` imports `LoginPage`/`InventoryPage` and `getCredentials`, which do not exist yet, so `npx tsc --noEmit` and `npx playwright test` fail with "Cannot find module".

- [ ] **Step 1: Write the failing spec** in `tests/login.spec.ts`, constructing page objects directly (`new LoginPage(page)`); Task 3 migrates it to fixtures. Tests:
  - `standard user can log in`: `open()`, `login(...getCredentials())`, expect `inventory.inventoryList` visible and `page` URL to match `/inventory\.html/`.
  - `invalid password shows an error`: `login(standardUser.username, 'wrong')`, expect `errorMessage` visible and URL not matching `/inventory\.html/`.
- [ ] **Step 2: Run to verify failure**
  Run: `npx tsc --noEmit` — Expected: FAIL, "Cannot find module '../pages/LoginPage'".
- [ ] **Step 3: Implement the files above** to the listed signatures. `BasePage.goto` wraps `page.goto(path)` (relative path resolves against `baseURL`); `LoginPage.open` calls `goto('/')`.
- [ ] **Step 4: Run to verify pass**
  Run: `npx tsc --noEmit` — Expected: exit 0.
  Run: `npx playwright test` — Expected: 2 passed (requires `npx playwright install chromium` and network; if browsers/network are unavailable, record that in the digest and rely on typecheck plus `npx playwright test --list` showing both tests).

---

### Task 3: Fixtures wiring page objects into tests

**Files:**
- Create: `fixtures/index.ts`
- Modify: `tests/login.spec.ts` (replace the `@playwright/test` import and the `new LoginPage(page)` / `new InventoryPage(page)` lines with fixture arguments)

**Interfaces:**
- Consumes: `LoginPage`, `InventoryPage` from Task 2.
- Produces: `fixtures/index.ts` exports `test` (from `base.extend<{ loginPage: LoginPage; inventoryPage: InventoryPage }>`) and re-exports `expect`.

Test-first: yes — change `tests/login.spec.ts` first to `import { test, expect } from '../fixtures'` and use `{ loginPage, inventoryPage }`; `npx tsc --noEmit` fails with "Cannot find module '../fixtures'" until `fixtures/index.ts` exists.

- [ ] **Step 1: Edit the spec** to import from `../fixtures` and destructure `loginPage`, `inventoryPage`; assertions unchanged.
- [ ] **Step 2: Run to verify failure** — `npx tsc --noEmit` — Expected: FAIL, missing module `../fixtures`.
- [ ] **Step 3: Implement `fixtures/index.ts`** with one `use(new XPage(page))` fixture per page object.
- [ ] **Step 4: Run to verify pass** — `npx tsc --noEmit` exits 0; `npx playwright test` shows 2 passed (same environment caveat as Task 2).

---

### Task 4: README

**Files:**
- Create: `README.md`

Test-first: no — documentation only; verified by reading it against the actual folder layout.

- [ ] **Step 1: Write a short README** (under ~40 lines) with: purpose and target site; a folder table (`tests/`, `pages/`, `fixtures/`, `test-data/`, `utils/`, `playwright.config.ts`); setup (`npm install`, then the manual `npx playwright install`); run commands (`npm test`, `npm run test:headed`, `npm run report`); optional `SAUCE_USERNAME`/`SAUCE_PASSWORD` overrides via env/`.env`-style shell vars (note: no dotenv dependency is installed); a note that locators are from public knowledge and may need adjusting if the site changes.

---

## Self-review

- Coverage: every scope item maps to a task (tooling T1; folders/data/pages/sample test T2; fixtures T3; README T4).
- negative-constraints: "no CI config" -> no task touches `.github/`; "do not commit" -> no commit steps, header forbids committing; "keep it small / scaffold only" -> 4 tasks, two page objects plus base, one spec file; "browser install is manual" -> documented in T4 only, not scripted in `package.json`. No task violates any of these.
- Assumptions recorded: locators unverified (Global Constraints); `npx playwright install` is manual (Global Constraints, T4).
