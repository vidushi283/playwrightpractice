# QA Health

**Last assessed**: 2026-11-02
**Coverage**: qualitative: low (no coverage data; 2 e2e tests, login only)

## Coverage Summary

| Module / area | Coverage | Notes |
|---|---|---|
| Login | unknown | 2 e2e tests: valid login, invalid password |
| Inventory | unknown | Page object exists; only asserted after login |
| Cart / checkout | unknown | No tests or page objects |

## Risky Untested Areas

| Path | Coverage | Risk reason |
|---|---|---|
| pages/InventoryPage.ts | unknown | Only used to confirm post-login state |
| (cart, checkout, logout flows) | none | No tests or page objects |

## Known Test Debt

none documented

## Recent Test Activity

- test-data/users.ts
- tests/login.spec.ts
