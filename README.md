# AvtoQism — Avtomobil Ehtiyot Qismlari Bozori (Uzbekistan)

O‘zbekistondagi eng yirik avtomobil ehtiyot qismlari onlayn platformasi va marketpleysi. Desktop, planshet va smartfonlar uchun 100% moslashuvchan dizayn (responsive), to‘liq demo rejim (localStorage) va Supabase integratsiyasi bilan.

---

## 🚀 Texnologiyalar (Stack)
- **Frontend:** React 18 + Vite, JavaScript (JSX)
- **Styling:** Toza CSS (CSS Custom Properties, Flexbox, CSS Grid, clamp(), dvh, media queries)
- **Navigatsiya & Router:** `react-router-dom` v6
- **Ikonkalar:** `lucide-react`
- **Animatsiyalar:** `framer-motion`
- **Grafiklar:** `recharts` (oxirgi 7 kunlik tashriflar statistikasi)
- **SEO & Meta:** `react-helmet-async`
- **Data Layer:** Supabase (Postgres, Auth, RLS) + **MANDATORY DEMO MODE** (avtomatik `localStorage` rejimida noldan ishlash)
- **Xabarnomalar:** Telegram bot bildirishnomalari (Supabase Edge Function orqali xavfsiz holda)

---

## 📦 Loyihani Ishga Tushirish

### 1. O‘rnatish:
```bash
npm install
```

### 2. Demo Rejimda Ishga Tushirish (Hech qanday sozlashlarsiz):
```bash
npm run dev
```
Brauzerda oching: [http://localhost:5173](http://localhost:5173)

> **Eslatma (Demo Mode):** Agar `.env` faylida `VITE_SUPABASE_URL` ko'rsatilmagan bo'lsa, loyiha avtomatik ravishda to'liq demo rejimida ishlaydi. 50 dan ortiq avto ehtiyot qismlari, brendlar, toifalar, sharhlar, buyurtma berish, savat va foydalanuvchi kabineti `localStorage` orqali saqlanadi va ishlaydi.

---

## 🔑 Demo Loginlar

Siz bitta tugma orqali yoki quyidagi loginlar bilan kirishingiz mumkin:

1. **Oddiy Foydalanuvchi (Azizbek):**
   - Telefon: `+998 90 123 45 67`
   - SMS tasdiqlash kodi: `123456`
   - Yoki parolli kirish: `azizbek@avtoqism.uz` / `123456`

2. **Admin Panel:**
   - URL: `/admin` (yoki yuqori o'ng menyudan)
   - Email: `admin@avtoqism.uz`
   - Parol: `admin123`

---

## 🗄️ Supabase Integratsiyasi (Ixtiyoriy)

Agar haqiqiy Supabase backendiga ulamoqchi bo'lsangiz:

1. [Supabase](https://supabase.com) saytida yangi loyiha oching.
2. `supabase/migrations/20250101_initial_schema.sql` faylini SQL Editor orqali ishga tushiring (jadvallar, indekslar va RLS xavfsizlik qoidalari yaratiladi).
3. `supabase/seed.sql` faylini ishga tushirib boshlang'ich tovarlarni yuklang.
4. `.env` faylini yarating:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_TELEGRAM_CHANNEL=https://t.me/avtoqism
   ```

---

## 🤖 Telegram Bot Bildirishnomalari

Xavfsizlik talablariga ko'ra Telegram bot tokenlari frontend kodiga yozilmaydi.
Bildirishnomalar `supabase/functions/notify-telegram` Edge Function orqali jo'natiladi.

1. Supabase loyihangizda muhit o'zgaruvchilarini qo'shing:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_ADMIN_CHAT_ID`
2. Edge Function'ni deploy qiling:
   ```bash
   supabase functions deploy notify-telegram
   ```
3. Demo rejimida Telegram bildirishnomalari avtomatik ravishda konsolga va ekran toast xabarnomasiga chiqariladi.

---

## 🌐 Ko‘p Tillilik (UZ / RU / EN)

- O‘zbekcha (`uz`), Ruscha (`ru`), Inglizcha (`en`) tillar to‘liq qo‘llab-quvvatlangan.
- Tilni almashtirish yuqori stripdan bir marta bosish orqali amalga oshadi va `localStorage`da saqlanib qoladi.

---

## 📱 Mobil va Responsive Qoidalar

- Desktop (1440px+): 3 ustunli asosiy blok, 4 talik mahsulotlar qatori.
- Laptop / Kichik Desktop (1024px - 1439px): moslashuvchan yon panellar.
- Planshet (768px - 1023px): toifalar gorizontal skroll, 3 ustunli tovarlar, pastki mobil navigatsiya.
- Smartfon (320px - 767px): 
  - To'liq ekranga moslashtirilgan qidiruv oynasi (Search Overlay).
  - Pastki qotirilgan qulay mobil menyu (Bottom Nav).
  - 4 ta ikonkali ixcham ko'k tasmacha (Top Strip).
  - 10 ta mashhur brendning gorizontal qulay aylantirilishi.
  - Mahsulot sahifasida qo'ng'iroq qilish va Telegram uchun qulay pastki tugmalar paneli.

---

## 🚢 Vercel yoki Netlify'ga Joylash (Deploy)

1. Build komandasi:
   ```bash
   npm run build
   ```
2. Chiqish papkasi:
   `dist`
3. SPA router qayta yo'naltirishlari uchun `index.html` konfiguratsiyasi qo'llab-quvvatlanadi.
# Avtoqisim
# Avtoqisim
# Avtoqisim
