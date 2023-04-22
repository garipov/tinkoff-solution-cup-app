import { useCallback, useEffect, useRef, useState } from 'react';

import { FetchError, FetchOptions } from '../utils/fetch';
import { fetchApi } from '../utils/fetchApi';

export const useFetchApi = <TResult, TFetchOptions extends FetchOptions>(path: string) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | FetchError | null>();
  const [result, setResult] = useState<TResult | null>();
  const abortController = useRef<AbortController>();

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current?.abort();
    };
  }, []);

  const trigger = useCallback(
    async (options: TFetchOptions) => {
      setIsFetching(true);

      try {
        const result = await fetchApi<TResult>(path, {
          abortSignal: abortController.current,
          ...options,
        });
        if (abortController.current?.signal.aborted) return;
        setResult(result);
      } catch (err) {
        if (abortController.current?.signal.aborted) return;
        setError(err as Error | FetchError);
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        if (abortController.current?.signal.aborted) return;
        setIsFetching(false);
      }
    },
    [path],
  );

  return { trigger, isFetching, result, error };
};
