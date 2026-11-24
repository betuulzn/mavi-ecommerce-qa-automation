# Hata Raporları

## Üst menüdeki Arama Yap alanı Enter ile açılmıyor

**Sayfa** · Mavi.com, `/cart`  
**Durum** · Playwright MCP ile yeniden üretildi ve kullanıcı tarafından doğrulandı.

### Tekrar adımları

1. Üst menüdeki **Sepet** bağlantısına tıkla.
2. `Shift+Tab` ile odağı **Arama Yap** alanına taşı.
3. Fareye dokunmadan `Enter` tuşuna bas.

**Beklenen** · Arama paneli açılır ve odak **Ne arıyorsun?** alanına geçer.

**Gerçekleşen** · Panel kapalı kalır ve odak salt okunur **Arama Yap** alanında kalır. Klavye odağı görünür biçimde işaretlenmez. Aynı alana fareyle tıklandığında panel açılır.

**Kullanıcı etkisi** · Klavyeyle gezinen kullanıcı arama alanına ulaştığını ekrandan anlayamaz ve paneli `Enter` ile açamaz.

**Kanıt** · [Enter sonrası](mavi-enter-arama.png) · [Fare tıklaması sonrası](mavi-tiklama-arama.png) · [Regresyon testi](tests/accessibility-search.spec.ts)
