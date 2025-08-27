// API Configuration with environment variables
const API_BASE_URL_DEV = import.meta.env.VITE_DEV_API_URL || "http://localhost:8000";
// Support both variable names to match start-dev.sh and .env usage
const API_BASE_URL_PROD = import.meta.env.VITE_PROD_API_URL || import.meta.env.VITE_API_BASE_URL_PROD;

// Prefer PROD if provided; otherwise fall back to DEV
const API_BASE_URL = API_BASE_URL_PROD || API_BASE_URL_DEV;

export const API_ENDPOINTS = {
  SEND_MESSAGE: `${API_BASE_URL}/v1/routes/message`,
  LOGIN: `${API_BASE_URL}/v1/routes/login`,
  SIGNUP_BASIC: `${API_BASE_URL}/v1/routes/signup/basic`,
  SIGNUP_DETAILS: `${API_BASE_URL}/v1/routes/signup/details`,
  USER_DETAILS: `${API_BASE_URL}/v1/routes/user/details`,
}; 