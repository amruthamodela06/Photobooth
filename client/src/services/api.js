/**
 * Thin fetch wrapper around the Photobooth Express API.
 * Base URL is configurable via VITE_API_URL (defaults to the local dev server).
 */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        // Non-JSON response (e.g. empty body)
    }

    if (!res.ok) {
        const message = data?.error || `Request failed with status ${res.status}`;
        const error = new Error(message);
        error.status = res.status;
        error.details = data;
        throw error;
    }
    return data;
}

export const api = {
    // Captures
    listCaptures: () => request('/capture'),
    saveCapture: (image) => request('/capture', { method: 'POST', body: JSON.stringify({ image }) }),
    deleteCapture: (filename) => request(`/capture/${encodeURIComponent(filename)}`, { method: 'DELETE' }),
    captureFileUrl: (filename) => `${API_BASE}/capture/file/${encodeURIComponent(filename)}`,

    // Settings
    getSettings: () => request('/settings'),
    updateSettings: (settings) => request('/settings', { method: 'PUT', body: JSON.stringify(settings) }),

    // Health
    health: () => request('/health'),
};

export default api;
