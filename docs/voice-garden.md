# Voice Garden

An optional voice-exploration feature at `/?view=voice`. Existing lessons remain usable without speaking or enabling a microphone.

## Learner flow

1. Start the microphone or try the clearly labelled simulated demo.
2. Auto calibration learns room noise for about 2.2 seconds, then asks for a comfortable hum to set a personal reference. The Auto calibrate button repeats this process. Manual calibration adjusts the room floor, noise margin, reference level and pitch.
3. Choose Steady voice, Pitch hills, Volume waves, Speak & pause, or Words & phrases. Starter (classes 1–2), Explorer (3–4), and Challenge (5+) offer longer rounds, narrower pitch guides and varied prompts. Learners can freely choose another level.
4. Follow the large symbol, short instruction, animated trace and colour feedback. Pauses preserve progress. Stars arrive during practice; simulated stars do not enter the session total.
5. Word recognition is separately opt-in. Recognition of a prompt earns a star, but is not a pronunciation or intelligibility assessment.

## Signal processing and rewards

- `hooks/use-voice-input.ts` owns microphone capture and cleanup. It requests browser noise suppression and echo cancellation, with automatic gain control off. A 75 Hz high-pass and 5 kHz low-pass feed an analyser, never speakers.
- `lib/voice/analysis.ts` analyses 4096 samples approximately every 80 ms using RMS dBFS and a periodicity-based pitch estimate across 60–1000 Hz. This is an estimator range, not a target for children. Calibration needs at least 12 clear, unclipped frames and median pitch deviation within two semitones.
- `lib/voice/practice.ts` learns the 80th-percentile room level and suppresses similar low-SNR periodic background sound. Manual noise margin ranges from 3–18 dB. A short visual hold bridges tiny gaps without inventing pitch or earning credit during silence.
- Pitch rounds wait for measurable pitch; volume and word rounds can accept unvoiced consonant energy. Ordinary pauses freeze the active clock. Rhythm requires alternating voice bursts and rests; silence alone and clipped input cannot earn credit.
- Three stars reward 20%, 50% and 80% of a round near the guide (or completed rhythm cycles). Word-round effort and recognized-word rewards are distinct. Session totals, reference values and transcripts are held in memory only.

The meter measures **dBFS**, not calibrated sound pressure (dB SPL). Pitch and loudness are separate quantities. Level guides use the reference ±6 dB; pitch tolerance depends on the chosen level. These are relative practice guides, not clinical or universally correct voice targets.

## Recognition and privacy

`hooks/use-word-recognition.ts` requests English browser speech recognition only after its own Start action. It defaults to on-device recognition and checks that the browser reports an installed local language pack. Unsupported browsers show a message rather than silently using an online service. The explicit online-service checkbox permits the browser provider to receive audio; its availability and processing policies depend on the browser. No application backend receives recordings or transcripts, and the application does not save them.

Stop mic, hidden-page, page navigation, disconnect and unmount paths release microphone resources. Recognition has independent cancellation and cleanup, and stops with the microphone. A generation token discards late permission or recognition-availability results. Pausing a round keeps the microphone active until Stop mic is selected.

## Verification and limits

Automated tests cover signal analysis, room-noise rejection, manual sensitivity, pauses, rhythm rests, clipping, partial-success rewards and whole-word matching. Headless Edge with synthetic fan/voice input completed automatic calibration and a rewarded round. Browser checks exercised manual calibration, demo isolation, level selection and mobile layout. Recognition integration checks use a mocked browser engine to verify explicit opt-in, local/online routing, word rewards and cancellation; they do not establish real transcription accuracy.

Background sound can still resemble speech; the gate does not identify a speaker. Breathy voices may lack a stable pitch. Physical microphones, fan environments and actual recognition need further testing with users and deaf educators. This prototype has no validated therapeutic or muscle-memory benefit. Recognition failure is not evidence of incorrect speech. Prompt content is illustrative and should be reviewed before instructional use. Keep practice comfortable; do not strain to match the guide.

Synthetic inputs and screenshots stay under ignored `work/`. No child recordings are committed.

References: [MDN waveform analysis](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData), [MDN on-device recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/processLocally).
