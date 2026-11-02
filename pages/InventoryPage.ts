import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly items: Locator;
  readonly itemPrices: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = page.locator('.inventory_list');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
  }

  itemAt(index: number): Locator {
    return this.items.nth(index);
  }

  priceOf(index: number): Locator {
    return this.itemAt(index).locator('[data-test="inventory-item-price"]');
  }

  addToCartButtonOf(index: number): Locator {
    return this.itemAt(index).locator('button[data-test^="add-to-cart"]');
  }
}
