const apiBaseUrl = (
  (
    import.meta.env
      .VITE_API_BASE_URL as string | undefined
  ) ?? ''
)
  .trim()
  .replace(/\/$/, '');

export const env = {
  /**
   * Backend server origin.
   *
   * Example:
   * http://localhost:8080
   *
   * Do not include /v1 here because individual API
   * services define their own endpoint paths.
   */
  apiBaseUrl,

  launchDate:
    (
      import.meta.env
        .VITE_LAUNCH_DATE as string | undefined
    ) || '2027-01-01T00:00:00Z',

  /**
   * Mock mode is enabled explicitly or automatically
   * when no backend API URL has been configured.
   */
  useMock:
    import.meta.env.VITE_USE_MOCK === 'true' ||
    apiBaseUrl === '',
} as const;