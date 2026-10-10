/**
 * Helper to get the CSRF token from meta tag or window.
 */
export function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        || window.__CSRF_TOKEN__
        || '';
}

/**
 * Standardized API client for JSON and Multipart requests.
 */
export async function apiRequest(url, options = {}) {
    const csrfToken = getCsrfToken();
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
        ...(options.headers || {}),
    };

    let body = options.body;
    if (body && !(body instanceof FormData) && typeof body === 'object') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }

    const response = await fetch(url, {
        ...options,
        headers,
        body,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || `Request failed with status ${response.status}`);
        error.data = data;
        error.response = { data, status: response.status };
        error.status = response.status;
        throw error;
    }

    return data;
}

/**
 * Convenience methods object (api.get, api.post, etc.)
 */
export const api = {
    get: (url, options = {}) => apiRequest(url, { ...options, method: 'GET' }),
    post: (url, body, options = {}) => apiRequest(url, { ...options, method: 'POST', body }),
    put: (url, body, options = {}) => apiRequest(url, { ...options, method: 'PUT', body }),
    patch: (url, body, options = {}) => apiRequest(url, { ...options, method: 'PATCH', body }),
    delete: (url, options = {}) => apiRequest(url, { ...options, method: 'DELETE' }),
};
