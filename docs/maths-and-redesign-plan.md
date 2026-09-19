# Anushruti: Maths Module & Full Redesign Architecture Plan

## 1. Audit Summary

### Existing Codebase Assessment
1. **Lessons & Curriculum**:
   - `lib/lessons.ts` contains 33 lessons total:
     - 28 Class 1 Science lessons (20 mapped to NCERT environmental topics with `curriculum` & `matching`/`guided` metadata, 8 enrichment science labs with distinct local WebP photos).
     - 14 Class 1 Maths lessons for Chapter 3 ("Mango Treat") added recently.
     - 1 Class 1 Maths lesson `count-to-five` (without chapter).
     - 4 Maths lessons for Grades 2–5 (`adding-groups`, `equal-groups`, `fractions`, `area`).
2. **Current Navigation & Broken Science Section**:
   - In `components/learning-workspace.tsx`, during the merge of PR #5, `sciencePath` was referenced in the filter logic (lines 113–116) without being defined in state. Additionally, `scienceImages`, `ScienceLab`, and `SciencePhoto` imports were accidentally omitted, leading to a fatal runtime `ReferenceError: sciencePath is not defined`.
   - `subjectIsChapterList` treated Science as having chapters, but Science lessons do not use `chapter` strings; they use `science.topic` and `curriculum`.
3. **Architecture Modularization**:
   - `components/learning-workspace.tsx` currently spans over 800 lines doing subject filtering, chapter trails, lesson playback, question quizzes, progress management, communication boards, and team prototype display.
   - We will decompose this into modular, single-responsibility components:
     - `components/shell/AppShell.tsx`: Responsive navigation shell (bottom bar on mobile/tablet, left rail on desktop, top bar with grade & settings).
     - `components/shell/SettingsSheet.tsx`: Text size, high-contrast theme, reduce motion, ISL panel toggle, haptics, adult mode, progress reset.
     - `components/maths/`: Interaction toolkit engines (`TapToCount`, `NumberTray`, `TapToBuildEquation`, `TenFrame`, `BeadFrame`, `Ginladi`, `NumberStrip`, `PlaceValueBlocks`, `HundredChart`, `CompareSets`, `SortBuckets`, `PositionScene`, `ShapeSpotter`, `MatchPairs`, `SequenceOrder`, `DayArc`, `DurationRace`, `MeasureWithUnits`, `CoinNoteTray`, `PatternBuilder`, `TallyAndPictograph`, `DrawCanvas`, `TalkCard`).
     - `components/maths/ChapterTrail.tsx`: 13-chapter winding visual journey with status indicators (`ready`, `partial`, `coming-soon`).
     - `components/maths/MathsLessonPlayer.tsx`: Stage, CaptionStrip (<=12 words), SignChip, ISL picture-in-picture panel, hint ladder, tactile feedback banner.
     - `components/science/ScienceWorkspace.tsx`: Preserving 100% of the 28 Class 1 science lessons, NCERT mapping, and discovery labs cleanly without errors.
     - `components/communication/CommunicationBoard.tsx`: Accessible AAC picture cards with instant polite aria feedback.

---

## 2. 13 NCERT Joyful Mathematics Chapters Map

| No. | ID | Chapter Title | Topic | Status | Source & Strategy |
|---|---|---|---|---|---|
| 1 | `maths-c01` | Finding the Furry Cat! | Pre-number concepts & position words | `ready` | Spatial concepts, PositionScene, SortBuckets, visual bell/rhyme replacements |
| 2 | `maths-c02` | What is Long? What is Round? | Shapes & spatial understanding | `partial` | ShapeSpotter, Roll/Slide simulations, SortBuckets |
| 3 | `maths-c03` | Mango Treat | Numbers 1 to 9 | `ready` | Migrating existing 14 Mango Treat lessons + TapToCount & NumberTray |
| 4 | `maths-c04` | Making 10 | Numbers 10 to 20 | `partial` | TenFrame, Ginladi, PlaceValueBlocks, NumberStrip |
| 5 | `maths-c05` | How Many? | Addition & Subtraction (1-digit) | `ready` | TapToBuildEquation, CompareSets, NumberTray |
| 6 | `maths-c06` | Vegetable Farm | Addition & Subtraction up to 20 | `partial` | Two baskets (7+5, 9+4, 8+8), Ginladi count-on, hop on strip, Sapna/Gauri tens+ones, cube crossing subtraction, Anjali & Renu hop, 5 problem stories |
| 7 | `maths-c07` | Lina's Family | Measurement | `ready` | CompareSets, MeasureWithUnits (handspans), SortBuckets, visual balances |
| 8 | `maths-c08` | Fun with Numbers | Numbers 21 to 99 | `coming-soon` | PlaceValueBlocks, HundredChart, tens/ones tiles |
| 9 | `maths-c09` | Utsav | Patterns & Festivals | `partial` | Festival explorer (Makar Sankranti, Pongal, Bihu, Lohri), pattern builder, rangoli dot grid, visual action patterns |
| 10 | `maths-c10` | How do I Spend my Day? | Time, routine, seasons | `partial` | DayArc sun/moon slider, Pihu's day routine, DurationRace, 4 seasons sorting |
| 11 | `maths-c11` | How Many Times? | Repeated addition & start of multiplication | `ready` | Horse swings (4x2), toy train (3x3), big wheel (5x4), jalebi plates (6x3), bus rows (9x2), crates (4x5), Cheenu shop |
| 12 | `maths-c12` | How Much Can We Spend? | Indian Money | `ready` | CoinNoteTray (coins: ₹1, ₹2, ₹5, ₹10; notes: ₹10, ₹20, ₹50), MatchPairs, buy/sell |
| 13 | `maths-c13` | So Many Toys and Puzzles | Data Handling | `coming-soon` | SortBuckets, TallyAndPictograph, CompareSets |

---

## 3. Design Tokens & Visual Hierarchy
- Warm paper palette (`--bg: #FFFBF3`, `--surface: #FFFFFF`, `--ink: #1E2A44`).
- Subject accents: Maths (`#2F55D4`), Science (`#1B7F5C`), Communication (`#C4442D`), Voice (`#7A3FC4`), Rewards (`#F5B301`).
- Feedback system: Never colour alone! Always Icon + Colour + Shape/Motion + Short Word (`✓ Yes` / `↻ Again`).
- High-contrast mode and dark mode support via token mapping.
- Minimum 56px touch targets, 4.5:1 text contrast, zero audio dependencies.

---

## 4. Execution Sequence
- **Phase 1**: Design tokens, typography variables in `app/globals.css`.
- **Phase 2**: Reusable UI shell, BottomBar, SideRail, SettingsSheet, Header.
- **Phase 3**: Maths interaction toolkit (`components/maths/*`).
- **Phase 4**: Chapter data pipeline (`lib/maths/*`, all 13 chapters).
- **Phase 5**: Progress v2 migration with sanitization & hint ladder scoring.
- **Phase 6**: Science & Voice Studio integration into the new shell + test suite expansion.
