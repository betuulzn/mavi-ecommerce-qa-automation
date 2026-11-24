import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { ProductPage } from '../pages/ProductPage';

const jeanSearchURL = /\/search\/?\?text=jean(?:&|$)/;
const productCardName = /^Favorilere ekle .+/;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.mavi.com/', { waitUntil: 'domcontentloaded' });
  await page.getByText('Tüm Çerezleri Reddet', { exact: true }).click();
});

test('Jean araması sonuç sayfasında ürün kartlarını listeler', async ({ page }) => {
  const header = new HeaderComponent(page);
  const results = page.getByRole('main');
  const productCards = results.getByRole('link', { name: productCardName });

  await header.searchFor('jean');

  await expect(page).toHaveURL(jeanSearchURL);
  await expect(page).toHaveTitle(/Arama Sonuçları/);
  await expect(productCards.first()).toBeVisible();
  await expect(productCards.nth(1)).toBeVisible();
});

test('Mevcut bedeni seçilen jean sepette bir adet görünür', async ({ page }) => {
  const header = new HeaderComponent(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const firstProductCard = page.getByRole('main')
    .getByRole('link', { name: productCardName })
    .first();

  await header.searchFor('jean');
  await expect(page).toHaveURL(jeanSearchURL);
  await expect(page).toHaveTitle(/Arama Sonuçları/);
  await firstProductCard.click();
  await expect(page).toHaveURL(/\/p\/[^/?]+/);
  await expect(product.title).toBeVisible();
  const productName = (await product.title.innerText()).trim();

  await product.selectAvailableSize();
  await product.addToCart();
  await expect(header.cartLink).toHaveAccessibleName('Sepet [1]');
  await header.openCart();

  await expect(page).toHaveURL(/\/cart\/?$/);
  await expect(cart.productLink(productName)).toBeVisible();
  await expect(cart.itemQuantities).toHaveCount(1);
  await expect(cart.itemQuantities).toHaveValue('1');
});
