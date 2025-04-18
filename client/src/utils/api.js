/**
 * API configuration utility
 * This file centralizes API URL configuration for the application
 */

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Creates a full API URL by combining the base URL with the endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login')
 * @returns {string} The complete API URL
 */
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

  // For local development with Vite's proxy
  if (import.meta.env.DEV) {
    return `/api/${cleanEndpoint}`;
  }

  // For production deployment
  return `${API_URL}/api/${cleanEndpoint}`;
};

export default {
  getApiUrl
};
