# Repository guidance

Read contribution.md before changing this project. Preserve the visual-first, sound-independent learner experience. Do not invent ISL signs, ship uncaptioned teaching videos, or require speech input.

Use typed content in lib/lessons.ts. Keep device-local demo persistence separate from future authenticated services. The team workspace is a prototype and must never be treated as authorization.

Compose existing components/ui primitives; do not modify vendored components to restyle the product. Keep app-specific styles in app/globals.css. Run pnpm typecheck, pnpm lint, pnpm test and pnpm build before proposing a merge.

Work on independent feature/, fix/, content/ or chore/ branches from the collaborative baseline. Never merge, deploy or alter repository access without task authorization. Do not commit secrets or identifiable child data.
