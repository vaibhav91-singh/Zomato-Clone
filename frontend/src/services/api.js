/**
 * Centralized Resilient API Service Layer
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const DEFAULT_TIMEOUT_MS = 10000;

class ApiClient {
  static async request(endpoint, options = {}) {
    const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(fetchOptions.headers || {})
    };

    const config = {
      credentials: 'include',
      ...fetchOptions,
      headers,
      signal: controller.signal
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      clearTimeout(timer);

      const contentType = response.headers.get('content-type');
      let data = {};
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP ${response.status}: Request failed`;
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        console.error(`[API TIMEOUT] ${endpoint} timed out after ${timeout}ms`);
        throw new Error('Server request timed out. Please check your internet connection.');
      }
      throw err;
    }
  }

  static get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  static post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }

  static put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options
    });
  }

  static delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export default ApiClient;
