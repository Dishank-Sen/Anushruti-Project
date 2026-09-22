# ISL, themes and phone layout validation

Validated against upstream `bb5161f`, 22 September 2026. The warm-paper layout, chapter organisation, science activities and on-demand transcription worker are retained.

## Automated checks

- `pnpm typecheck`, `pnpm lint`, `pnpm test`: pass, 43 tests.
- `pnpm build`: passes for the Vinext target.
- `pnpm build:vercel`: passes, including static entry and asset verification.
- Builds still report the existing large JavaScript/worker chunk advisory; no deployment was performed.

## Browser checks

Headless Microsoft Edge, one browser at a time:

- 96 combinations: Home, both subject libraries, Play, Progress, Talk, Team, Sign Studio, Voice Garden, science lesson/activity and maths lesson; light/dark themes; widths 320, 390, 768 and 1440. No document overflow or page errors.
- All 86 science and maths lesson pages checked at 320px, including image-load failures and page errors: none found.
- Theme persists through reload and navigation. High contrast, reduced-motion setting and hiding in-lesson ISL support remain usable. Settings is a modal with Escape dismissal. The unit regression also covers blocked storage.
- Five main views checked with 200% text at 768px. Fixed the maths chapter status badge overflow found by this check.
- Science word selection, unloaded-by-default ISL media, government PDF URLs, chart dismissal and unknown-word fallback checked. Original external media remains dependent on its publisher and internet access; this is not a linguistic review of every clip.
- Production preview at 320px: microphone stop stays above bottom navigation; automatic and manual calibration work; a completed practice earns stars; optional word-matching controls remain disabled without microphone access.
- Caption integration checked with synthetic captured audio and a mocked transcription worker: explicit opt-in, bounded input, word-based rewards, ignored stale results, and worker termination on stop. The speech model/inference implementation was not changed or downloaded again for this patch.

These are browser simulations, not a physical-phone microphone test or clinical assessment. For content review, follow [ISL source guidance](isl-sources.md). All core learning remains available without voice or external media.
