import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly itemQuantities: Locator;
  private readonly main: Locator;

  constructor(page: Page) {
    this.main = page.getByRole('main');
    this.itemQuantities = this.main
      .getByRole('combobox')
      .filter({ has: page.getByRole('option', { name: '1 Adet', exact: true }) });
  }

  productLink(name: string) {
    return this.main.getByRole('link', { name, exact: true }).filter({ hasText: name });
  }
}
