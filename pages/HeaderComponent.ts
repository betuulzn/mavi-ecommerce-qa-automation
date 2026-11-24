import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly searchTrigger: Locator;
  readonly searchInput: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    const header = page.getByRole('banner');

    this.cartLink = header.getByRole('link', { name: /^Sepet \[\d+\]$/ });
    this.searchTrigger = header.getByRole('textbox', { name: 'Arama Yap', exact: true });
    this.searchInput = page.getByRole('textbox', { name: 'Ne arıyorsun?', exact: true });
  }

  async openCart() {
    await this.cartLink.click();
  }

  async searchFor(query: string) {
    await this.searchTrigger.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async focusSearchFromCart() {
    await this.page.keyboard.press('Shift+Tab');
  }

  async activateFocusedSearch() {
    await this.page.keyboard.press('Enter');
  }
}
