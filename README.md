# Anushruti

A free, open-source learning garden for deaf and non-speaking children in Classes 1–5. Maths and science are taught through visual steps, readable explanations, and untimed activities.

## Run locally

Use Node.js 22.13+ and pnpm 11.19.0 (Corepack can manage pnpm).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed by the server. Check changes with `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`.

## What this MVP includes

- A responsive learner dashboard, class and subject filters, 13 Class 1 maths chapters and science discovery modules.
- Self-paced visual lesson steps, transcripts, and interactive questions.
- Device-local lesson completion and activity insights, with a reset option.
- Communication cards, an optional [Voice Garden](docs/voice-garden.md) with live level/pitch feedback, and an illustrative team workspace.
- Shared [official ISLRTC references](docs/isl-sources.md) in maths, science and Sign Studio, with original alphabet/number charts. Dictionary media loads only on request.
- Light/dark themes, high-contrast settings, and direct Voice Garden access from Home and the desktop/mobile navigation.

This is a **local prototype**. It has no accounts, server database, speech assessment, or real role-based access control. ISL resources are original publisher-hosted dictionary references, not sentence translation; instructional suitability still needs qualified review. Progress belongs to the browser/device, not an identified child. Clearing browser storage clears progress. Do not enter real child data in the team demo. Visual lesson completion is not video watch completion.

## Team

Start with [contribution.md](contribution.md), [architecture](docs/architecture.md), and [content guide](docs/content-guide.md). The collaboration baseline is `base/collaborative-mvp`. Use independent `feature/`, `fix/`, `content/`, and `chore/` branches and pull requests.

## Hosting

For Vercel, use the checked-in static build configuration described in [Vercel deployment](docs/vercel.md). Run `pnpm build:vercel` and `pnpm preview:vercel` to check that target locally. A Vercel deployment has not been verified by this fix. The current scaffold uses React, TypeScript, Vinext/Vite, and Base UI components. Vinext is beta: evaluate its stability before public production. The generated Cloudflare configuration is an optional deployment path, not a requirement to use proprietary storage. A self-hosted web runtime and PostgreSQL (or an open-source managed PostgreSQL service) can be evaluated when authentication and shared progress are added. See the architecture document for migration boundaries.

Code is MIT licensed. Educational photos carry their own source credits and licences in the typed lesson content. Official ISL media is linked or embedded from its publisher, not redistributed under the code licence. New educational media must carry explicit reuse permission and attribution.
