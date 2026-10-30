# saucedemo-playwright

Playwright (TypeScript) automation scaffold for https://www.saucedemo.com, using the Page Object Model.

## Structure

| Path | Purpose |
| --- | --- |
| `tests/` | Test specs (`login.spec.ts`) |
| `pages/` | Page objects: `BasePage`, `LoginPage`, `InventoryPage` |
| `fixtures/` | Extends Playwright's `test` to provide page objects |
| `test-data/` | Static test data (public demo credentials) |
| `utils/` | Small helpers (`env.ts` reads credentials) |
| `playwright.config.ts` | Base URL, reporters, `chromium` project |

## Setup

```bash
npm install
npx playwright install   # manual step: downloads the browsers
```

## Run

```bash
npm test             # run all tests headless
npm run test:headed  # run with a visible browser
npm run report       # open the last HTML report
npm run typecheck    # tsc --noEmit
```

## Credentials

Defaults to the public `standard_user` / `secret_sauce`. Override with shell variables
`SAUCE_USERNAME` and `SAUCE_PASSWORD` (both must be set). No dotenv dependency is installed,
so a `.env` file is not loaded automatically.

## Notes

Locators come from public knowledge of the site and may need adjusting if the site changes.
