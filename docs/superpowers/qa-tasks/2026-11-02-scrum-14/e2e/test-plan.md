# Test Plan — SCRUM-14: inventory page test on sucedemo.com

**Framework:** playwright | **Complexity:** XS | **Scenarios:** 2 / 2 | **Candidates → merged:** 2 → 2 | **Skipped (unverifiable):** 0

## Scenarios

| ID     | Title                                                         | AC Ref | Priority | Type | Verification approach | Params |
|--------|---------------------------------------------------------------|--------|----------|------|-----------------------|--------|
| TC-001 | Inventory page displays 6 items                               | AC-1   | P1       | UI   | After login as standard_user and landing on /inventory.html, `expect(inventoryPage.items).toHaveCount(6)` (locator `.inventory_item`) | — |
| TC-002 | Every inventory item shows a price and an Add to Cart button  | AC-2   | P1       | UI   | For each of the 6 `.inventory_item` elements, the `.inventory_item_price` is visible with non-empty text matching `$<number>`, and the `Add to cart` button (`button[data-test^="add-to-cart"]`) is visible and enabled; asserted per item (count of prices = 6, count of buttons = 6) | — |

Precondition for both: user is logged in as `standard_user` / `secret_sauce` (via `loginPage.open()` + `loginPage.login(...)` with `getCredentials()`, as in `tests/login.spec.ts`) and is on `/inventory.html`.

## Skipped / Manual-only ACs

None. Both ACs are UI-verifiable with concrete element assertions.

Note: ac-check.json records `ac_source: derived-from-description` (confidence 85); the ACs were taken from the ticket description, not a dedicated AC field.

## Page Objects Required

- `InventoryPage` (`pages/InventoryPage.ts`) — existing; extend with new locators (currently only `inventoryList`):
  - `items` — `.inventory_item` (public readonly, asserted directly in specs)
  - `itemPrices` — `.inventory_item_price` (public readonly)
  - `addToCartButtons` — `button[data-test^="add-to-cart"]` (public readonly)
  - Optionally a helper such as `itemAt(index)` to scope price and button to a single item for TC-002.
- `LoginPage` — existing, no change (used for the precondition).
- `BasePage` — existing, no change.
- `fixtures/index.ts` — existing, no change needed (already provides `loginPage` and `inventoryPage`).
- New spec: `tests/inventory.spec.ts` (`test.describe('Inventory', ...)`, imports from `../fixtures`); a `beforeEach` performing the login precondition is recommended so both tests share it.

## Test Data

- Credentials: existing `getCredentials()` from `utils/env.ts` (defaults to the public demo `standard_user` / `secret_sauce`); `standardUser` in `test-data/users.ts` already exists. No new test-data file required.
- Expected item count: inline constant `6` (from AC-1).
- Price format: inline regex `/^\$\d+(\.\d{2})?$/`.
