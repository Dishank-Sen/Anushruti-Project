# Deploying the MVP on Vercel

The default `pnpm build` produces a Vinext/Cloudflare Worker bundle. A successful build of that bundle does not make it a Vercel deployment: the original configuration had no Vercel runtime adapter or static HTML entry in its public output.

`vercel.json` now explicitly selects **Other** (`framework: null`), installs with the committed pnpm lockfile, runs `pnpm build:vercel`, and publishes only `dist/vercel`. The dedicated Vite browser entry imports the existing application and stylesheet; no lessons or UI are duplicated. All current navigation uses query parameters on `/`, so no catch-all rewrite is required.

## Vercel project settings

- Root Directory: the repository root (leave blank or use `.`).
- Node.js: 24.x, matching CI.
- Use the build/install/output configuration checked into `vercel.json`; remove stale dashboard overrides pointing at `public`, `.next`, or `dist`.
- Deploy the commit containing this fix. A PR preview may require approval from the upstream Vercel project owner when submitted from a fork.

No API keys or database bindings are needed for this MVP. Existing browser-local progress stays tied to its origin: localhost and a Vercel URL have separate storage.

## Verify locally

```sh
pnpm install --frozen-lockfile
pnpm build:vercel
pnpm preview:vercel
```

Open the URL printed by the preview command. The build verifies that the generated HTML references existing JavaScript/CSS assets and includes the app mount point and favicon. CI runs both the original build and this Vercel build.

This target is a client-rendered static website. Adding authenticated server APIs, server actions, secrets, or database access requires a separate supported backend/runtime design. Never put server secrets into browser environment variables.

## Diagnostic limits

GitHub reported the earlier Vercel deployment as successful; its private build logs were not available during this fix. The incompatible output configuration is confirmed from the repository, but the exact error seen by the user has not been independently confirmed. A real Vercel preview/redeployment is still required to verify project-specific settings and access.
