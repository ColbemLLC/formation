<p align="center">
  <img src="https://github.com/ColbemLLC.png" width="96" height="96" alt="Colbe" />
</p>

<h1 align="center">Formation</h1>

<p align="center">The public marketing site for Colbe, served at <b>colbe.cc</b>.</p>

## What lives here

- Landing page
- Documentation and credits
- Registration and login
- Maintenance page (shown until launch on 30 Nov 2026, 4:00 PM CAT)

After registration, users continue to `app.colbe.cc/onboarding`. The signed-in product lives in the separate **formations** repo.

## How it fits together

| Surface | Domain | Repo |
| --- | --- | --- |
| Marketing, registration, login | `colbe.cc` | formation (this repo) |
| Signed-in app | `app.colbe.cc` | formations |
| API | `api.colbe.cc` | featheredleaf |

- The session cookie is shared across `.colbe.cc`, so the app recognizes users who registered here.
- `proxy.ts` sends visitors who already have a session from `/login` and `/register` to `app.colbe.cc/home`. It only checks that the cookie exists; the app validates the session itself.
- If the app sends a user back with `?next=` or `?expired=1`, the proxy does not redirect again, which prevents a loop.
- `proxy.ts` also adds security headers to every response.

## Stack

- Next.js (App Router), TypeScript
- Tailwind CSS v4
- Bun
- Phosphor icons, Instrument Serif, Inter / Geist

## Getting started

```bash
bun install
bun dev
```

The site runs at `http://localhost:3000`.

Cross-subdomain cookies do not work on plain `localhost`. To test the handoff to the app locally, use a hosts-file domain such as `colbe.test` and `app.colbe.test`.

## Structure

- `app/` routes and layouts
- `packages/ui/` shared UI components (notch nav, gradient wave, and so on)
- `proxy.ts` signed-in redirect and security headers
- `app/globals.css` design tokens (blue theme; dark mode uses the `.dark` class)

## Conventions

- Shared code lives under `packages/`, not a `lib` folder.
- Animations and the gradient wave are for the marketing site only.
- Headings use Instrument Serif; icons are Phosphor, with no emojis.
- Radius is `rounded-nav` (10px) for buttons and `rounded-card` (14px) for cards.

## Deployment

Each repo deploys on its own. Before shipping, check that the build passes in CI (`bun run build`) and that `babel-plugin-react-compiler` is installed, since `reactCompiler` is enabled.

## License

Proprietary. All rights reserved. The code, designs and assets in this repository may not be copied, reproduced or redistributed without written permission.