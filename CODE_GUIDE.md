# Project Code Guide

This guide explains how the Nishant weds Diksha wedding invitation website is
organized, how its main features work, and where to make common changes.

## At a glance

This is a single-page website built with React, TypeScript, and Vite. Its page
is assembled from React components, styled primarily with CSS, and enhanced
with Framer Motion animations and Lucide icons.

There is no router or application backend. RSVP responses and guest wishes
are stored in the visitor's browser using `localStorage`; they are not sent
to the couple or shared with other visitors.

## How the application starts

1. `index.html` supplies the HTML document, metadata, font links, and the
   `<div id="root">` element where React mounts.
2. `src/main.tsx` imports the global stylesheet and mounts the React app into
   that root element. It wraps the app in `React.StrictMode` during development.
3. `src/App.tsx` imports and arranges the page sections. The order of the
   components in its JSX determines the order visitors see on the page.

## Project map

```text
.
├── public/
│   ├── favicon.svg
│   └── images/
│       └── temple-gopuram.png
├── src/
│   ├── components/
│   │   ├── shared.tsx
│   │   └── ...page section components
│   ├── data/
│   │   └── weddingData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

### Main files

- `src/App.tsx` is the page composition. It includes the accessible
  “Skip to invitation” link, the cover, main content sections, footer, and
  floating music control.
- `src/main.tsx` is the React entry point and imports `src/index.css`.
- `src/data/weddingData.ts` holds much of the wedding-specific content.
- `src/index.css` contains the global styles, page layouts, responsive
  breakpoints, animations, and reduced-motion overrides.
- `public/` contains static assets served from the website root. For example,
  `public/images/temple-gopuram.png` is referenced in the app as
  `/images/temple-gopuram.png`.

## Page sections and components

`src/App.tsx` currently renders the page in this order:

1. **Hero** — `src/components/Hero.tsx` shows the cover, names, date, and
   temple image. Framer Motion ties the temple's scale, split movement, glow,
   and scroll cue to scroll progress.
2. **Invitation** — `src/components/Invitation.tsx` shows family names,
   invitation wording, couple names, and the date.
3. **Date reveal** — `src/components/DateReveal.tsx` uses React state to
   expand a date detail when its seal button is clicked.
4. **Celebrations** — `src/components/Functions.tsx` maps over the events in
   `weddingData` and renders event cards. Wedding schedule rows are rendered
   only when an event has a schedule.
5. **Couple and photos** — `src/components/Couple.tsx` shows the story and
   embeds `src/components/Carousel.tsx`. The carousel keeps the current photo
   index in React state and wraps previous/next navigation around the photo
   list.
6. **Hashtag** — `src/components/Instagram.tsx` displays the wedding hashtag
   and offers a clipboard-copy button.
7. **Video** — `src/components/Video.tsx` embeds the configured video URL in
   a lazy-loaded iframe.
8. **Countdown** — `src/components/Countdown.tsx` calculates the remaining
   time to the configured ISO date and updates it every second. Its interval
   is cleared when the component unmounts.
9. **Things to know** — `src/components/ThingsToKnow.tsx` shows the venue,
   creates a Google Maps search link from the venue text, and offers a Google
   Calendar link.
10. **RSVP** — `src/components/RSVP.tsx` collects attendance and guest
    details, then saves them in the current browser.
11. **Wishes** — `src/components/Wishes.tsx` reads saved wishes on mount and
    allows visitors to add wishes in that browser.
12. **Footer** — `src/components/Footer.tsx` closes the page and links back
    to the top.
13. **Music control** — `src/components/MusicPlayer.tsx` provides a floating
    button that starts or pauses synthesized ambient tones using the Web
    Audio API. It does not autoplay or use an audio file.

### Shared presentation components

`src/components/shared.tsx` contains small reusable building blocks:

- `Reveal` wraps content in a Framer Motion entrance animation. It uses
  `useReducedMotion` to avoid the initial motion when the visitor prefers
  reduced motion.
- `SectionHeading` standardizes section titles, eyebrow text, and an optional
  light-on-dark appearance.
- `Ornament` renders the decorative divider used in several sections.

Most section components are intentionally separate so content and behavior
for one part of the page can be understood and edited without navigating a
single enormous component.

## Wedding content and customization

Start with `src/data/weddingData.ts`. It currently contains:

- Couple names, a formatted date, an ISO date/time, and a hashtag
- Groom's and bride's family names
- Event titles, dates, times, venues, descriptions, icons, and the wedding
  schedule
- The venue, contact text, and video embed URL

The components import `weddingData` and display the relevant values. For
example, `Functions.tsx` reads `weddingData.events`, `Countdown.tsx` reads
`weddingData.couple.dateISO`, and `ThingsToKnow.tsx` reads
`weddingData.venue`.

Not every piece of displayed copy is centralized. Some dates, text, and links
are still written directly in components, including the hero and date reveal,
the calendar URL, and parts of the RSVP and footer. When changing the wedding
date or names, search the project for the old value and update every
intentional occurrence so the page remains consistent.

Other useful customization points:

- Replace `public/images/temple-gopuram.png` with the desired cover artwork.
- Replace the sample photo URLs in `src/components/Carousel.tsx` with the
  couple's photos and update their `alt` text.
- Change `weddingData.videoUrl` to the desired embeddable video URL.
- Add actual family contact details in `src/components/ThingsToKnow.tsx`.
- Update the calendar event URL in `ThingsToKnow.tsx` if its date, time,
  title, or event details change.
- Adjust fonts, colors, spacing, responsive behavior, and component styling
  in `src/index.css`.

## How state and browser storage work

React's `useState` keeps interactive values while the page is open. Examples
include the open/closed state of the date reveal, current carousel photo,
countdown display, form fields, RSVP confirmation, music state, and wishes.

The project also uses browser `localStorage`:

- RSVP submissions use the key `nishant-diksha-rsvp`. The saved JSON includes
  the form fields, the selected attendance response, and a submission time.
- Wishes use the key `nishant-diksha-wishes`. The page loads the saved list
  when it mounts and limits the displayed list to the newest 30 entries.

`localStorage` belongs to the current browser and website origin. It is not
a shared guest book or a reliable RSVP collection system: clearing browser
data removes it, and the couple cannot see another visitor's submissions.
For real guest management, connect the forms to a backend or a form service
and consider the privacy and access controls required for guest information.

The wish loader also has a `try/catch` around parsing stored JSON. This lets
the page continue to render if the saved value is malformed; it resets the
in-memory wishes to an empty list.

## Styling, responsive design, and motion

`src/index.css` is the main source of visual styling. Components use class
names such as `hero`, `event-grid`, and `rsvp-form`, which are defined there.
The stylesheet includes:

- Shared color variables and typography
- Section, card, button, form, and footer styles
- Breakpoints at 760px and 420px for narrower screens
- Entrance and decorative animations
- A `prefers-reduced-motion` media query that minimizes animation and disables
  smooth scrolling for visitors who request reduced motion
- Visible focus outlines and a screen-reader-only utility class

Tailwind directives are included in `src/index.css`, and
`tailwind.config.js` defines the content paths, palette, and font families.
The page's current visual rules are primarily custom CSS in `index.css`.
`postcss.config.js` connects Tailwind CSS and Autoprefixer to the CSS build.

Framer Motion provides the scroll and entrance effects. Lucide React provides
icons such as map pins, clocks, arrows, and music controls. Decorative text
and symbols are also used directly in the JSX.

## Dependencies and project configuration

`package.json` defines the scripts and packages:

- `react` and `react-dom` render the UI.
- `framer-motion` provides animations.
- `lucide-react` supplies icons.
- `vite` serves the app and builds production assets.
- `typescript` and React type packages provide static checking.
- Tailwind CSS, PostCSS, and Autoprefixer are configured for CSS processing.

`vite.config.ts` enables Vite's React plugin. `tsconfig.app.json` configures
the strict TypeScript check for `src/`, while `tsconfig.node.json` covers the
Vite config. `tsconfig.json` references these projects.

## Run, check, and build

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite prints a local URL in the terminal. Open that URL in a browser to view the
site while developing.

Check TypeScript and create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The build command runs `tsc -b` before `vite build`. Vite writes generated
files to `dist/`; do not edit generated output as a substitute for editing
the source files.

## Accessibility and behavior notes

- The skip link in `App.tsx` allows keyboard users to jump to the invitation.
- Interactive elements are generally native buttons, links, or form controls.
- Icon-only controls have accessible labels.
- Image alternatives are provided for the cover artwork and carousel photos;
  the duplicate decorative temple image is hidden from assistive technology.
- `Reveal` and the CSS reduced-motion media query account for reduced-motion
  preferences.
- The video iframe has a title and is lazy-loaded.
- External links opened in a new tab use `rel="noreferrer"`.

When modifying interactive UI, preserve keyboard access, meaningful labels,
visible focus, and sensible reduced-motion behavior.

## Troubleshooting

- **Changes do not appear in the browser:** confirm the development server is
  running, save the edited file, and check the browser console and terminal
  for build errors.
- **Changes do not appear in `git status`:** check that the file is inside
  this repository, is not ignored, and is not unchanged from the last commit.
  Run `git status --short -- path/to/file` to inspect one file.
- **Images do not load:** files under `public/` are addressed from the site
  root. Check that the filename and URL match, including capitalization.
- **Countdown is wrong:** verify the ISO timestamp in
  `weddingData.couple.dateISO` and its timezone offset.
- **RSVPs or wishes are missing on another device:** this is expected with
  browser-local `localStorage`; a backend is needed to share submissions.
- **The hashtag copy button does not work:** clipboard access is controlled
  by the browser and may require a secure context such as HTTPS or localhost.
- **Video does not play:** verify that `videoUrl` is an embeddable URL and
  that the video owner permits embedding.

## Formatting

The project files have been formatted with Prettier. To format the source
files and project text/config files again without adding Prettier to the
project dependencies, run:

```bash
npx --yes prettier@3.6.2 --single-quote --write "src/**/*.{ts,tsx,css}" index.html postcss.config.js tailwind.config.js vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json package.json README.md
```
