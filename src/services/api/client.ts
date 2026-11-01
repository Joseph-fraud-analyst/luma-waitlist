import { env } from '../../config/env';

export class ApiError extends Error {
  readonly status: number;
  readonly retryAfter: number | null;

  constructor(
    status: number,
    message: string,
    retryAfter: number | null = null,
  ) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

function getRetryAfter(response: Response): number | null {
  const value = response.headers.get('Retry-After');

  if (!value) {
    return null;
  }

  const seconds = Number(value);

  if (
    Number.isFinite(seconds) &&
    seconds >= 0
  ) {
    return seconds;
  }

  return null;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `${env.apiBaseUrl}${path}`,
    {
      ...init,

      headers: {
        Accept: 'application/json',
        ...init.headers,
        ...(init.body
          ? {
              'Content-Type': 'application/json',
            }
          : {}),
      },
    },
  );

  if (!response.ok) {
    let message =
      'Something went wrong. Please try again.';

    try {
      const body =
        (await response.json()) as ApiErrorResponse;

      if (
        typeof body.error === 'string' &&
        body.error.trim() !== ''
      ) {
        message = body.error;
      } else if (
        typeof body.message === 'string' &&
        body.message.trim() !== ''
      ) {
        message = body.message;
      }
    } catch {
      // The response was not JSON.
      // Keep the safe default message.
    }

    throw new ApiError(
      response.status,
      message,
      getRetryAfter(response),
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}