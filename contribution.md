# Contributing to Anushruti

## Start small

1. Open an issue describing the learner need and acceptance criteria. For educational changes, state class, subject, concept and the intended visual explanation.
2. Fetch the baseline: `git fetch origin`. Once the maintainer publishes it, branch from `origin/base/collaborative-mvp` with `git switch -c feature/issue-12-lesson-player origin/base/collaborative-mvp`. Before publication, branch from the local `base/collaborative-mvp`.
3. Choose a prefix: `feature/`, `fix/`, `content/`, or `chore/`, followed by the issue number and short purpose. One concern per branch; no unrelated reformatting.
4. Run `pnpm install --frozen-lockfile`, then `pnpm dev`.
5. Implement, test, and update relevant documentation. Use conventional commit subjects such as `feat(lessons): add fraction activity`.
6. Open a draft PR into `base/collaborative-mvp`. Include the issue, before/after behavior, validation and screenshots for UI changes. Never commit credentials or children's personal information.
7. Resolve reviews, rerun checks, and request approval. A maintainer squash-merges and removes the completed feature branch. Rebase your own branch when necessary; never rewrite a shared branch.

## Responsibility hierarchy

| Role                           | Responsibility                                                                   | Repository authority                               |
| ------------------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------- |
| Intern / contributor           | Claim scoped issues, implement, test and document                                | Feature branches and draft PRs                     |
| Mentor / reviewer              | Review code, accessibility and educational correctness; guide interns            | Review approval; no self-approval                  |
| Content/accessibility reviewer | Validate concept accuracy, captions, ISL and age suitability with deaf educators | Required specialist review for instructional media |
| Maintainer / admin             | Triage, approve releases, manage access, merge and deploy                        | Protected branch merges and repository settings    |

These are proposed working roles; the website team screen does not grant permissions. Repository owners must assign real collaborators/teams. Before accepting team PRs, protect the baseline and main branches: require PRs, one independent approval (plus specialist review for content), passing `checks`, resolved conversations, and no force pushes or deletion. CODEOWNERS currently names the repository owner; add actual mentor and content-review team handles after assignment. Do not treat this document as enforcement.

## Definition of done

- A child can complete the task with sound off and without speaking.
- Instructions pair visuals with short text; correct/incorrect feedback uses words and symbols, not colour alone.
- Keyboard navigation, visible focus, mobile width and 200% zoom remain usable.
- No autoplay, forced time limit, flashing content, or required voice input; respect reduced motion.
- Captions and a transcript accompany videos. ISL clips require qualified review; do not invent signs or label a generic hand icon as sign language.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` pass.
- New behavior has meaningful tests, media has licence/attribution, and docs describe limitations.

## Review and release

Never merge your own unreviewed PR. The maintainer promotes an approved, tested baseline to main for releases. Hosting, authentication, privacy and database migrations require separate scoped PRs. Report security issues privately to repository maintainers through GitHub private vulnerability reporting if enabled; do not post child data or secrets in public issues.
