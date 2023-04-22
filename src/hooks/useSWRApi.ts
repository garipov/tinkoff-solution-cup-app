import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

import { fetchApi } from '../utils/fetchApi';
import { FetchOptions } from '../utils/fetch';

type Key = [path: string, options?: FetchOptions];

function fetcher([path, options]: Key) {
  return fetchApi(path, options);
}

export const useSWRApi = <TResult>(path: Key | null, options?: PublicConfiguration) => {
  return useSWR<TResult>(
    path,
    // todo: fix ts error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetcher,
    options,
  );
};
