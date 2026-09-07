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

- A responsive learner dashboard, class and subject filters, and ten sample lessons.
- Self-paced visual lesson steps, transcripts, and interactive questions.
- Device-local lesson completion and activity insights, with a reset option.
- Communication practice extension points and an illustrative team workspace.

This is a **local prototype**. It has no accounts, server database, verified ISL videos, speech assessment, or real role-based access control. Progress belongs to the browser/device, not an identified child. Clearing browser storage clears progress. Do not enter real child data in the team demo. Visual lesson completion is not video watch completion.

## Team

Start with [contribution.md](contribution.md), [architecture](docs/architecture.md), and [content guide](docs/content-guide.md). The collaboration baseline is `base/collaborative-mvp`. Use independent `feature/`, `fix/`, `content/`, and `chore/` branches and pull requests.

## Hosting later

No service has been deployed. The current scaffold uses React, TypeScript, Vinext/Vite, and Base UI components. Vinext is beta: evaluate its stability before public production. The generated Cloudflare configuration is an optional deployment path, not a requirement to use proprietary storage. A self-hosted web runtime and PostgreSQL (or an open-source managed PostgreSQL service) can be evaluated when authentication and shared progress are added. See the architecture document for migration boundaries.

Code is MIT licensed. New educational media must carry explicit reuse permission and attribution. No third-party lesson media is bundled.
