import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly title: Locator;
  private readonly addToCartButton: Locator;
  private readonly sizeGroups: Locator;

  constructor(private readonly page: Page) {
    const main = page.getByRole('main');

    this.title = main.getByRole('heading', { level: 1 });
    this.addToCartButton = main.getByRole('button', { name: 'Sepete Ekle', exact: true });
    this.sizeGroups = main.locator('.pss-group');
  }

  async selectAvailableSize() {
    await this.addToCartButton.click();
    await expect(this.sizeGroups.first()).toBeVisible();

    for (const group of await this.sizeGroups.all()) {
      const option = group.getByRole('button', { disabled: false }).first();
      const [stockResponse] = await Promise.all([
        this.page.waitForResponse(response => {
          const url = new URL(response.url());
          return url.pathname.includes('/products/getProductSizeAndLength/')
            && url.searchParams.has('type');
        }),
        option.click(),
      ]);
      expect(stockResponse.ok(), 'Beden ve stok sorgusu başarılı olmalı').toBe(true);
      await stockResponse.finished();
      await expect(group.locator('.pss-item--selected')).toBeVisible();
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
