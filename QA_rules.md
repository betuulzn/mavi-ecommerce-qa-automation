# Proje QA ve Keşif Testi Kuralları
- Keşif ve test yazımı sırasında mutlaka **Playwright MCP** kullan; canlı DOM üzerinden doğrulama yapmadan kod üretme.
- Dil: TypeScript | Framework: Playwright | Mimari: Page Object Model (`pages/` ve `tests/`).
- Seçici önceliği: `getByTestId` -> `getByRole` -> `getByLabel` -> `getByText`. XPath yasaktır.
- Sabit bekleme (`waitForTimeout`) kullanma; her senaryoda net `expect` doğrulamaları yap.
