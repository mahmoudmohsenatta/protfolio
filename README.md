# Bilingual Mobile & AI Front-End Portfolio Monorepo

Tailored portfolio showcase for **Atlantis Contracting (`atlantis.sa`)** and **Lina & Lino (`linalino.sa`)**.

## Structure

- `apps/portfolio` — Bilingual AR/EN RTL Portfolio Hub, Case Studies (`/work/[slug]`), Role-Fit Matrix, Expo QR Launcher, and `@sahm/tokens` Explorer (`http://localhost:3000`)
- `apps/nabd-mobile` — React Native + Expo SDK 58 Credit Lifestyle Marketplace App (11 screens, Saudi OTP auth, Riyadh/Jeddah map & filters, Moyasar/mada sandbox checkout, QR tickets, CameraView venue scanner, local notifications, Gemini AI concierge)
- `apps/dar-web` — Next.js 16 Interior Design, Fit-Out & Custom Furniture Storefront featuring the **AI Room Designer** (Before/After slider + Shop This Look), AI Design Chatbot, Consultation Booking & Customer Dashboard (`http://localhost:3001`)
- `apps/nabd-partner` — Venue Partner Operations Dashboard with live QR code verification, 7-day attendance/credit charts, and class scheduling (`http://localhost:3002`)
- `packages/tokens` — `@sahm/tokens`: shared colors, spacing, radius, shadows, and `IBM Plex Sans Arabic` typography
- `supabase/schema.sql` — PostgreSQL schema ready for auth, venues, bookings, wallets, products, and AI room designs

## Commands

```bash
# Run Portfolio Hub (port 3000)
npm run dev:portfolio

# Run Dar Web + AI Room Designer (port 3001)
npm run dev:dar

# Run Nabd Partner Dashboard (port 3002)
npm run dev:partner

# Run Nabd Mobile App (Expo)
npm run dev:mobile

# Verify all lint, builds, and mobile unit tests
npm run test:mobile
npm run lint:all
npm run build:webs
```

## Optional Environment Variables

- `apps/nabd-mobile`: `EXPO_PUBLIC_GEMINI_API_KEY` (falls back to offline bilingual intent engine when unset)
- `apps/dar-web`: `GEMINI_API_KEY` (falls back to studio design engine when unset)

