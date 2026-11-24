# Mavi.com · Keşif Testi ve QA Otomasyonu

[Mavi.com](https://www.mavi.com/) üzerinde arama, ürün filtreleme, beden seçimi ve sepet akışını inceleyen uçtan uca QA projesi. Canlı sitedeki keşif bulguları, alışveriş senaryoları ve doğrulanmış bir klavye erişilebilirliği hatası için regresyon testi içerir.

[Türkçe](#türkçe) · [English](#english)

## Türkçe

### Keşif bulguları

| Alan | Gözlem |
| --- | --- |
| Arama ve filtre | `jean` araması **100 ürün** gösterdi. **Renk → Siyah** filtresiyle liste **22 ürüne** düştü. |
| Ürün ve sepet | Filtreli listenin ilk ürünü Milan Comfort Siyah Jean Pantolon (00810A3320), bel 32 / boy 31 ile sepete eklendi. Ürün ve beden sepet sayfasında doğrulandı. |
| JavaScript | Ana sayfada iki `ReferenceError: $ is not defined` ve bir `Uncaught [object Object]` kaydedildi. Üç hatanın çağrı yığınında Google Tag Manager vardı. Kullanılmayan bir JavaScript ön yüklemesine ilişkin uyarılar da tekrarlandı. |
| Ağ | İlk keşif oturumunda kaydedilen 579 istekte HTTP `4xx/5xx` görülmedi. Bir Insider arama isteği `net::ERR_ABORTED` ile iptal edildi. Sonraki bazı otomasyon koşularında Cloudflare `403` döndürdü. |
| Görseller | Yüklenmesi tamamlanan görsellerde kırık görsel görülmedi. Ana sayfada yedi görselin alternatif metni `undefined` idi. |

### Klavye erişilebilirliği

Sepet sayfasında üst menüdeki **Sepet** bağlantısına tıkla. `Shift+Tab` ile **Arama Yap** alanına geç ve `Enter` tuşuna bas.

- **Beklenen** · Arama paneli açılır ve odak **Ne arıyorsun?** alanına geçer.
- **Gerçekleşen** · Panel açılmaz ve odak salt okunur alanda kalır. Odak için görünür bir işaret belirmez. Fareyle tıklandığında panel açılır.

Tekrar adımları ve ekran görüntüleri için [hata kaydına](BUG_REPORTS.md) bakın.

### Teknolojiler ve test kapsamı

- **Playwright Test ve TypeScript** ile uçtan uca senaryolar ve doğrulamalar.
- **Page Object Model** ile üst menü, ürün ve sepet etkileşimleri [`pages/`](pages/) altında.
- **Playwright MCP ve OpenAI Codex** ile canlı DOM incelemesi, keşif bulgularının doğrulanması ve testlerin geliştirilmesi. CLI testlerini çalıştırmak için MCP veya Codex bağlantısı gerekmez.
- [`shopping-flow.spec.ts`](tests/shopping-flow.spec.ts) arama sonuçlarını ve sepette doğru ürünün bir adet olduğunu doğrular. Son Chromium koşusunda iki test de geçti.
- [`accessibility-search.spec.ts`](tests/accessibility-search.spec.ts) klavye davranışını doğrular. Canlı hatanın gözlendiği Chromium koşusunda görünürlük doğrulaması başarısız oldu. Hata sürdükçe bu başarısızlık beklenir.

### Kurulum ve çalıştırma

Proje dizininde **Node.js 20+**, npm ve internet erişimiyle aşağıdaki komutları çalıştırın. `npm ci` bağımlılıkları kilit dosyasından kurar. Playwright kurulumu Chromium, Firefox ve WebKit tarayıcılarını indirir.

```bash
npm ci
npx playwright install
npx playwright test --workers=1
```

Son komut yapılandırılmış üç tarayıcı projesini tek işçiyle çalıştırır. Canlı stok, site davranışı ve erişim koşulları sonuçları etkileyebilir.

```bash
# Yalnızca olumlu alışveriş senaryoları
npx playwright test tests/shopping-flow.spec.ts --project=chromium --workers=1

# Bilinen klavye hatasını yeniden üret
npx playwright test tests/accessibility-search.spec.ts --project=chromium --workers=1

# Son HTML raporunu aç
npx playwright show-report
```

---

## English

### Project overview

This QA project combines exploratory testing and end-to-end automation on the live Mavi.com storefront. It covers product search, filtering, size selection, adding items to the cart, and keyboard access to the header search.

| Area | Observation |
| --- | --- |
| Search and filtering | Searching for `jean` returned **100 products**. Applying **Color → Black** narrowed the list to **22**. |
| Product and cart | The first filtered result, Milan Comfort Black Jeans (00810A3320), was added to the cart in waist 32 / length 31. The product and size were verified in the cart. |
| JavaScript | The home page logged two `ReferenceError: $ is not defined` errors and one `Uncaught [object Object]` error. All three stacks included Google Tag Manager. Unused JavaScript preload warnings also recurred. |
| Network | No HTTP `4xx/5xx` responses were observed among 579 requests in the initial exploratory session. One Insider search request returned `net::ERR_ABORTED`. Some later automated runs received Cloudflare `403` responses. |
| Images | No broken images were observed among those that finished loading. Seven home-page images had `undefined` as their alternative text. |

### Confirmed keyboard accessibility defect

On the cart page, click the **Sepet** (Cart) link in the header. Press `Shift+Tab` to move focus to **Arama Yap** (Search), then press `Enter`.

- **Expected** · The search panel opens and focus moves to the **Ne arıyorsun?** input.
- **Actual** · The panel stays closed and focus remains on the read-only trigger, which has no visible focus indicator. A mouse click opens the panel.

See the [bug report](BUG_REPORTS.md) for reproduction steps and screenshots.

### Stack and test coverage

- **Playwright Test and TypeScript** power the end-to-end tests. The **Page Object Model** organizes header, product, and cart interactions under [`pages/`](pages/).
- **Playwright MCP and OpenAI Codex** supported live DOM inspection, exploratory validation, and test development. The CLI tests run independently of MCP and Codex.
- [`shopping-flow.spec.ts`](tests/shopping-flow.spec.ts) verifies search results and the correct product at a quantity of one in the cart. Both tests passed in the last Chromium run.
- [`accessibility-search.spec.ts`](tests/accessibility-search.spec.ts) checks keyboard activation and focus. The Chromium run reached the known defect and failed at the search input visibility assertion.

### Setup and execution

From the project root, use **Node.js 20+**, npm, and an internet connection. The first command installs the locked dependencies. The second downloads Chromium, Firefox, and WebKit. The full run executes all configured browser projects with one worker.

```bash
npm ci
npx playwright install
npx playwright test --workers=1
```

```bash
# Run only the positive shopping flows
npx playwright test tests/shopping-flow.spec.ts --project=chromium --workers=1

# Reproduce the known keyboard defect
npx playwright test tests/accessibility-search.spec.ts --project=chromium --workers=1

# Open the latest HTML report
npx playwright show-report
```

The tests use the live site. Inventory, site behavior, and access conditions can affect results. While the keyboard defect persists, the regression test is expected to fail when it reaches the search visibility assertion.
