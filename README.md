# Nishant weds Diksha — Wedding Invitation

A mobile-first React + TypeScript wedding invitation built with Vite, Tailwind CSS, Framer Motion and Lucide React.

See [CODE_GUIDE.md](./CODE_GUIDE.md) for a full walkthrough of the app structure, components, data, styling, and development workflow.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Customize the invitation

- Edit `src/data/weddingData.ts` for names, family names, date, events, venue, hashtag and video URL.
- Replace `public/images/temple-gopuram.png` with your preferred transparent temple/mandap artwork.
- Replace the sample couple carousel photos in `src/components/Carousel.tsx` with your own photos.
- Update the YouTube embed URL in `weddingData.ts`.
- Add a real phone number/contact method in `src/components/ThingsToKnow.tsx`.

## RSVP and wishes

The RSVP demo saves the current browser's response to `localStorage` under `nishant-diksha-rsvp`. The wishes wall persists entries in `localStorage` under `nishant-diksha-wishes`. These are browser-local demos, not a shared database or email delivery system. Connect a backend (for example, Supabase, Firebase or a form service) before using the invitation for real guest management.

The ambient music control synthesizes a soft drone using the Web Audio API after the visitor taps it; it does not autoplay.
