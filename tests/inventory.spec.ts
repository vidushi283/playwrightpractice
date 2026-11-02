import { test, expect } from '../fixtures';
import { getCredentials } from '../utils/env';

const EXPECTED_ITEM_COUNT = 6;
const PRICE_FORMAT = /^\$\d+(\.\d{2})?$/;

test.describe('Inventory', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.open();
    const { username, password } = getCredentials();
    await loginPage.login(username, password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('inventory page displays 6 items', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(EXPECTED_ITEM_COUNT);
  });

  test('every inventory item shows a price and an Add to Cart button', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(EXPECTED_ITEM_COUNT);
    await expect(inventoryPage.itemPrices).toHaveCount(EXPECTED_ITEM_COUNT);
    await expect(inventoryPage.addToCartButtons).toHaveCount(EXPECTED_ITEM_COUNT);

    for (let i = 0; i < EXPECTED_ITEM_COUNT; i++) {
      await expect(inventoryPage.priceOf(i)).toBeVisible();
      await expect(inventoryPage.priceOf(i)).toHaveText(PRICE_FORMAT);
      await expect(inventoryPage.addToCartButtonOf(i)).toBeVisible();
      await expect(inventoryPage.addToCartButtonOf(i)).toBeEnabled();
    }
  });
});
