# Architecture and extension plan

## Current boundary

`app/page.tsx` owns the learner shell. `components/learning-workspace.tsx` owns the lesson, activity, insights and team prototype views. `lib/lessons.ts` contains typed instructional content. `lib/progress.ts` validates and updates the versioned device-local progress record. Shared accessible primitives are in `components/ui/`; compose them instead of editing their internals.

The MVP has no child identity, network analytics, camera, or external media dependency. The optional Voice Garden uses a microphone only after an explicit start action; its signal processing is entirely in memory on the device. Optional word recognition defaults to on-device processing; a separate explicit online-service opt-in allows the browser provider to receive audio. See [Voice Garden](voice-garden.md) for microphone lifecycle and measurement limits. Local storage is explicitly demo persistence. Treat it as untrusted: validate IDs, counters and values on load. Do not use it for authorization or authoritative completion.

## Planned production services

Introduce a repository/service layer for lesson content, enrolments, lesson events and assignment attempts. Use immutable lesson versions, server-issued timestamps and idempotent completion events. Store video progress separately from learning mastery: a watched video does not imply understanding. Require authenticated server-side authorization on every admin mutation; never rely on a role selector or hidden controls.

Suggested relational entities: users, role_assignments, learner_profiles, lessons, lesson_versions, media_assets, enrolments, lesson_progress, assignment_attempts, review_requests and audit_events. Scope mentor access to assigned learners. Define guardian/teacher consent, data minimisation, retention and deletion requirements before collecting any child data. Never expose student information through public dashboards.

Media belongs in object storage with captions, transcripts, language, duration, licence and review status. ISL is distinct from English and must be verified with qualified deaf educators. Media upload, transcoding and caption editing are independent feature PRs.

## Sequenced backlog

1. Review sample concepts with deaf educators; create licensed ISL and captioned media.
2. Add a real captioned video player with resume and separate watch-completion tracking.
3. Add teacher-managed authentication and enforced contributor/reviewer/admin permissions.
4. Add PostgreSQL migrations, authenticated progress APIs and retention controls.
5. Test with children and educators for comprehension, keyboard/touch use and accessible feedback.
6. Select hosting, configure secrets, backups, monitoring and deployment workflows; release only after review.

The generated `.openai/hosting.json` contains no registered project or database. Nothing is published. Avoid binding curriculum content to the hosting provider.

## Validation boundaries

The shipped checks cover TypeScript, application lint, progress storage validation, content integrity and production compilation. The generated `components/ui/` catalog and `hooks/use-mobile.ts` are excluded from lint because their upstream implementations conflict with scaffold rules; they remain typechecked. The app uses explicit browser-storage/query hydration and full-document navigation, with documented lint exceptions for those choices. Dependency lifecycle scripts are explicitly denied; platform binaries installed as packages support the build.

HTTP smoke checks returned 200 for all seven main views; these do not validate client interactions. Manual acceptance before release: navigate every sidebar item; change class and subject; complete and revisit a lesson; answer incorrectly then correctly; reload progress; cancel and confirm reset; test communication cards; inspect narrow mobile layout, keyboard-only use, 200% zoom and reduced motion. These browser interaction checks have not been performed as part of this initial implementation.

An optional read-only WebMCP progress tool is feature-detected in supporting browsers. No supported WebMCP validation context was available during development, so its live registration remains unverified. It cannot complete lessons or modify progress.
