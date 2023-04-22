import { API_BASE_PATH } from '../config';
import { mocks } from '../mock';
import { FetchOptions, fetch } from './fetch';
import { sleep } from './sleep';

export const fetchApi = async <TResult = unknown>(path: string, options: FetchOptions = {}) => {
  if (API_BASE_PATH === 'mock:') {
    const { method = 'GET' } = options;

    const mock = mocks[path]?.[method];

    if (!mock) throw new Error(`Method "${method}" is not aloowed for "${path}"`);

    console.log('mock request', path, 'options:', options);

    await sleep(500);

    return mock(options) as TResult;
  }

  return fetch<TResult>(API_BASE_PATH + path, options);
};
