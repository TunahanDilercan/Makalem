# Makalem

Next.js tabanlı akademik içerik (makale) platformu: keşfet, yaz ve paylaş.

- Keşfet/arama
- Markdown ile yazma + önizleme
- (Opsiyonel) Firebase Firestore ile yayınlama

## Çalıştırma

```bash
pnpm install
pnpm dev
```

## Ortam Değişkenleri

Firebase kullanacaksan `.env.example` → `.env.local` yapıp `NEXT_PUBLIC_FIREBASE_*` değerlerini doldur.

## Build / Deploy (Firebase Hosting)

```bash
pnpm build # statik çıktı: out/
firebase deploy --only hosting
```
