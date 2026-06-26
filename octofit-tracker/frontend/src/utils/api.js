export const getApiBaseUrl = (path = '') => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const extractItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = [payload.results, payload.items, payload.data, payload.records, payload.objects];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }
  }

  return [];
};
