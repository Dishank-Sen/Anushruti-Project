# Voice Garden

Optional voice exploration at `/?view=voice`. Lessons remain usable without speech or microphone access.

## Practice and phone layout

Start the microphone, stay quiet for room calibration, then hum comfortably to set a personal level and pitch. Auto-calibrate repeats setup; manual calibration adjusts the background floor, noise margin, comfortable level and pitch. A reference below the detection threshold cannot be applied. Cancelling manual setup resumes unfinished automatic calibration.

The full-width level marker sits beside the feedback and chart on phones. Its green range always represents the current personal target ±6 dB, including the moving Volume waves target; it no longer uses a hard-coded bar scale with an unrelated centre label. Pitch and loudness are separate quantities. Values are device-relative dBFS, not environmental decibels or clinical targets. Recalibrate when changing microphone distance or device.

Feedback requires a change to persist for 400 ms, with at least 900 ms between ordinary changes. Phase changes appear immediately. The symbol no longer remounts or bounces on every sample. Meter motion uses a 180 ms exponential smoother. A 450 ms visual hold spans small gaps without awarding silence any progress. Reduced-motion settings disable transitions.

## Capture and detection

`hooks/use-voice-input.ts` owns the stream and AudioContext. Browser automatic gain, noise suppression and echo cancellation are requested off: speech enhancement was observed fading a sustained synthetic hum by more than 10 dB after calibration. Device hardware may still process its signal. A 75 Hz high-pass and 5 kHz low-pass feed analysis and a silent AudioWorklet. The worklet transfers 2048-sample mono PCM blocks; microphone audio is never played through speakers.

RMS level and YIN pitch are measured approximately every 80 ms. Pitch analysis subsamples toward 12 kHz to reduce phone work. Room calibration learns the 80th-percentile level and any consistent room pitch. A candidate must exceed the noise margin and contain confident periodic voice for at least 120 ms to open the gate. Nearby unvoiced consonants are allowed within 200 ms of periodic voice. Loud unpitched noise or isolated taps cannot open it. This heuristic is not a neural voice detector or speaker identification: music and other voices may pass, while breathy voices can be missed. Manual sensitivity and close microphone placement help; do not strain to satisfy the display.

Pitch rounds require measurable pitch; volume and rhythm use gated voice. Pauses preserve progress. Word rounds do not award progress or stars for microphone energy. A final recognised match during an active word round earns one star; failures are not graded as incorrect pronunciation. Demos remain labelled and do not add session stars.

## Local captions and temporary phrases

“Enable captions” loads [Transformers.js](https://huggingface.co/docs/transformers.js/en/index) and the quantised [Whisper tiny.en ONNX model](https://huggingface.co/onnx-community/whisper-tiny.en). The model revision is pinned to `2575352d61be1bf7225cf8f8b268a4678025fc58`. English is the initial supported language. The base [model card](https://huggingface.co/openai/whisper-tiny.en) declares Apache-2.0; the original [Whisper project](https://github.com/openai/whisper/blob/main/LICENSE) is MIT. Transformers.js is Apache-2.0 and ONNX Runtime is MIT. Model assets are fetched from their source, not committed to this repository.

A single Web Worker performs quantised WASM inference with one CPU thread, no GPU and one request at a time. Model/runtime files download only after opt-in and may be cached by the browser. Initial download needs internet and memory use still varies by device. Audio is not sent to an inference service. There is no online fallback.

The in-memory utterance buffer includes up to 300 ms of lead-in, waits for a 700 ms pause and submits at most six seconds at once. At least 240 ms of gated voice is required. Audio is resampled to 16 kHz. While processing, the UI asks the learner to wait; incoming audio is discarded rather than queued. This is short-phrase transcription, not word-by-word streaming or a continuous recording service. Download and inference have timeouts, with cancellation and retry controls.

The latest eight text phrases stay in React state only. Clear phrases erases them; navigation/unmount discards them. No recordings, child identifiers or transcripts enter persistent storage or the backend. Stop captions terminates its worker; Stop microphone, hidden tab, page exit and disconnect release the microphone and transcription resources. Generation IDs reject late results after changing words or clearing text. Model errors never grant rewards.

## Verification and limits

Unit tests cover pitch across sample rates, calibration, clipping, fan rejection, transient/noise rejection, pauses, rhythm, stable cues, target mapping, bounded utterances and resampling. Browser checks cover 320/390/768 px layouts across the main views, microphone calibration and rewarded rounds, manual controls, demos, caption opt-in, PCM capture, stale results and cleanup. A public JFK speech fixture was transcribed by the actual model in headless Edge; synthetic microphone and mock-worker tests separately exercise UI controls. This does not establish recognition accuracy for children, atypical speech or physical phone microphones.

Captions can hallucinate or mishear; they are not a pronunciation, intelligibility or therapy assessment. Validate on real Android/iOS devices and with deaf educators before claiming mobile accuracy or learning benefits. The feature provides visual practice feedback, not a guaranteed therapeutic outcome.

Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm build:vercel`. Browser fixtures and temporary screenshots remain under ignored `work/`; no child recordings are committed.
