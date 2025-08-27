// API Configuration with environment variables
const API_BASE_URL_DEV = import.meta.env.VITE_DEV_API_URL || "http://localhost:8000";
const API_BASE_URL_PROD = import.meta.env.VITE_PROD_API_URL;

// const API_BASE_URL = API_BASE_URL_DEV
const API_BASE_URL = API_BASE_URL_PROD

export const API_ENDPOINTS = {
  SEND_MESSAGE: `${API_BASE_URL}/v1/routes/message`,
  LOGIN: `${API_BASE_URL}/v1/routes/login`,
  SIGNUP_BASIC: `${API_BASE_URL}/v1/routes/signup/basic`,
  SIGNUP_DETAILS: `${API_BASE_URL}/v1/routes/signup/details`,
  USER_DETAILS: `${API_BASE_URL}/v1/routes/user/details`,
}; 