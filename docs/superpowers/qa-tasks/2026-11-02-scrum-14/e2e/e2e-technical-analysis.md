# E2E Technical Analysis - SCRUM-14

## Feature area
UI-only story: automate checks on the Swag Labs inventory page (https://www.saucedemo.com/inventory.html) after logging in as standard_user / secret_sauce. AC: (1) 6 items displayed; (2) every item has a price and an "Add to Cart" button. No implementation diff, MR or commits exist (implementation_source = minimal); this is a test-only story against a third-party demo site.

## Existing test patterns
- `tests/login.spec.ts`: `test.describe('Login', ...)`, imports `{ test, expect }` from `../fixtures`, uses `loginPage.open()` then `loginPage.login(username, password)` with `getCredentials()` from `utils/env`, then asserts `inventoryPage.inventoryList` visible and `toHaveURL(/inventory\.html/)`.
- `pages/InventoryPage.ts`: only exposes `inventoryList = page.locator('.inventory_list')`; extends `BasePage`. New inventory locators (item cards, price, add-to-cart button) belong here.
- `pages/LoginPage.ts`: private readonly locators by id; `open()` goes to `/`, `login()` fills and clicks.
- `fixtures/index.ts`: provides `loginPage` and `inventoryPage` fixtures; no pre-logged-in fixture exists (a login step or new fixture is needed for the precondition).
- `playwright.config.ts`: baseURL https://www.saucedemo.com, chromium only, fullyParallel.
- `test-data/users.ts` exports `standardUser`; `utils/env.ts` `getCredentials()` defaults to public demo credentials.

## Conventions
- Spec files `*.spec.ts` in `tests/` (suggested: `tests/inventory.spec.ts`), `test.describe` + `test()`.
- Page Object Model; locators private readonly unless asserted by specs.
- Selectors: ids / data-test attributes preferred; saucedemo exposes `.inventory_item`, `.inventory_item_price`, and `[data-test^="add-to-cart"]` buttons (to be confirmed by the generator).
- Credentials via `getCredentials()` / `test-data`, not hardcoded in specs.
