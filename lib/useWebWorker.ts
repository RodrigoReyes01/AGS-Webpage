import { useEffect, useRef, useState } from 'react';

interface UseWebWorkerOptions {
  onMessage?: (event: MessageEvent) => void;
  onError?: (error: ErrorEvent) => void;
}

export function useWebWorker(workerPath: string, options?: UseWebWorkerOptions) {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.Worker) {
      setError(new Error('Web Workers not supported'));
      return;
    }

    try {
      const worker = new Worker(workerPath);
      workerRef.current = worker;
      setIsReady(true);

      if (options?.onMessage) {
        worker.addEventListener('message', options.onMessage);
      }

      if (options?.onError) {
        worker.addEventListener('error', options.onError);
      }

      return () => {
        worker.terminate();
        workerRef.current = null;
        setIsReady(false);
      };
    } catch (err) {
      setError(err as Error);
    }
  }, [workerPath, options]);

  const postMessage = (message: any) => {
    if (workerRef.current && isReady) {
      workerRef.current.postMessage(message);
    } else {
      console.warn('Worker not ready');
    }
  };

  return { postMessage, isReady, error, worker: workerRef.current };
}
