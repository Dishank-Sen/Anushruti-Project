import {
  env,
  pipeline,
  type AutomaticSpeechRecognitionPipeline,
} from '@huggingface/transformers';

env.allowLocalModels = false;
// One CPU thread, one request, no GPU allocation. Stop terminates this worker.
env.backends.onnx.wasm!.numThreads = 1;
let transcriber: AutomaticSpeechRecognitionPipeline | null = null;
let busy = false;
self.onmessage = async (
  event: MessageEvent<{ type: string; audio?: Float32Array; id?: number }>,
) => {
  if (busy) return;
  busy = true;
  try {
    if (event.data.type === 'load') {
      transcriber = await pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        {
          revision: '2575352d61be1bf7225cf8f8b268a4678025fc58',
          device: 'wasm',
          dtype: 'q8',
          progress_callback: (p) => {
            if (p.status === 'progress')
              self.postMessage({
                type: 'progress',
                progress: Math.round(p.progress),
              });
          },
        },
      );
      self.postMessage({ type: 'ready' });
    } else if (transcriber && event.data.audio) {
      const result = await transcriber(event.data.audio, {
        max_new_tokens: 64,
        num_beams: 1,
        do_sample: false,
      });
      const text = (Array.isArray(result) ? result[0].text : result.text)
        .trim()
        .slice(0, 300);
      self.postMessage({ type: 'result', text, id: event.data.id });
    }
  } catch {
    self.postMessage({
      type: 'error',
      message:
        'Captions could not run on this device. Try again, or keep using the visual exercises.',
    });
  } finally {
    busy = false;
  }
};
