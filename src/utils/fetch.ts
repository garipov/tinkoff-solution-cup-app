export interface FetchOptions<
  TBody extends Record<string, string> = Record<string, string>,
  TParams extends Record<string, string> = Record<string, string>,
  THeaders extends Record<string, string> = Record<string, string>,
> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: THeaders;
  params?: TParams;
  body?: TBody;
  abortSignal?: AbortController['signal'];
}

export class FetchError extends Error {
  constructor(public message: string, public status: number, public data?: unknown) {
    super(message);
  }
}

export const fetch = async <TResult = unknown>(url: string, options?: FetchOptions) => {
  const { method = 'GET', body, params, headers } = options || {};

  const urlParams = params ? '?' + new URLSearchParams(params) : '';

  const response = await window.fetch(url + urlParams, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const result = await response.json();
    return result as TResult;
  }

  try {
    const error = await response.json();
    throw new FetchError(response.statusText, response.status, error);
  } catch (e) {
    const error = await response.text();
    throw new FetchError(error, response.status);
  }
};
