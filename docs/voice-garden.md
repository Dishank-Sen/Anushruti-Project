# Voice Garden

An independent, optional voice-exploration feature at `/?view=voice`, available from the sidebar. Every existing lesson still works without speaking or enabling a microphone. No account, recording, upload, transcription service, or stored voice profile is involved.

## Learner flow

1. Start the microphone (HTTPS or localhost required) or explore the clearly labelled simulated demo.
2. With a supportive adult, use a comfortable hum to set a reference over three seconds. No need to get louder to qualify; move closer or find a quieter space if the signal is unclear.
3. Choose a steady pitch, a small rise-and-fall, or a word prompt, then start a five-second practice. Stop at any point. Words show a trace, not pronunciation correctness.
4. See seconds of detectable periodic voice and, for guided exercises, time near the target. There are no grades, streaks, therapeutic claims, or penalties. Demo rounds never count toward real rounds.

## Implementation

- `components/voice-studio.tsx`: exercise UI, reference setup, in-memory trace and round feedback.
- `hooks/use-voice-input.ts`: explicit microphone request, Web Audio graph, throttled analysis and cleanup. No graph connection to speakers. Requested auto gain control, noise suppression and echo cancellation are off where the browser supports these constraints.
- `lib/voice/analysis.ts`: RMS dBFS, YIN-style periodicity estimator, confidence rejection, reference validation, relative pitch and guide curves. Typed word prompts live here rather than being treated as assessed curriculum lessons.

A 4096-sample buffer is analysed at most every 80 ms. The pitch search is approximately 70–700 Hz and returns null for quiet/aperiodic samples. Gaps never count as a successful match. This range is an estimator boundary, not a desired range for children. The chart shows pitch relative to the child's reference, capped visually at ±7 semitones. The hill rises only 3 semitones. Calibration requires at least 12 clear, unclipped voiced frames, with a median pitch deviation no larger than 2 semitones.

The meter shows **dBFS**, a digital microphone level, not calibrated **dB SPL**. Colour boundaries are the measured reference ±6 dB. The green band is a relative practice guide, not a clinical, safe-volume, or universally correct pitch target. Before setup the colours are illustrative default level bands; the UI asks the learner to set a reference. Matching requires both a pitch within ±1.5 semitones of the guide and a microphone level within the reference band. Word practice deliberately does not score a target match.

All raw samples, derived reference values, traces and results are in memory only. Starting a new microphone session clears the reference and previous trace. Stop, permission cancellation, disconnect, hidden-page, navigation, and unmount paths release tracks and close the AudioContext. A generation token discards a stream returned after cancellation. A stopped round cancels only that round; the always-visible Stop microphone control ends capture.

## Validation and limitations

Unit tests cover RMS levels, amplitude invariance of pitch, 44.1/48 kHz signals with harmonics, quiet/constant/noisy input, clipping, calibration rejection and target geometry. Test-generated tones are mathematical fixtures, not recordings of children. Browser tests use a synthetic microphone, not the user's hardware.

Before release, test multiple physical microphones and browsers with deaf educators and a qualified speech-language professional. Background periodic sounds may look like voice; the system cannot identify a speaker. Breathy voices and consonants may have no stable pitch. No clinical benefit, muscle-memory improvement, pronunciation correctness or speech intelligibility has been validated. Prompt words are illustrative practice, not assessed speech instruction. Children should never strain or shout to follow a guide.

References: [MDN Web Audio waveform analysis](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData), [NIDCD voice care](https://www.nidcd.nih.gov/health/taking-care-your-voice).

## Verified in this implementation

- Ten automated Node tests pass (four existing progress/content tests and six signal-analysis tests).
- Headless Edge with a synthetic 220 Hz microphone completed reference setup and a guided round, reporting the expected frequency and five seconds near the guide.
- Browser checks covered demo isolation (no mic request or real-round count), word navigation, permission denial, a late permission result after cancellation, explicit stop, hiding the page, and fresh-session reference reset.
- Desktop/mobile layouts were inspected; 390 px width and 200% text scaling had no horizontal overflow. Reduced-motion mode and stopping the simulated demo were exercised. Keyboard arrow/Enter exercise selection and the mobile sticky Stop mic control passed browser checks.

These are software checks, not validation with real microphones or children. The local synthetic test inputs and screenshots live only under ignored `work/`; no voice recordings are committed.
