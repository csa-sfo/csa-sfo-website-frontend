// API Configuration with environment variables
const API_BASE_URL_DEV = import.meta.env.VITE_DEV_API_URL || "http://localhost:8000";
const API_BASE_URL_PROD = import.meta.env.VITE_PROD_API_URL;

// Use production URL by default, fallback to dev for local development
export const API_BASE_URL = API_BASE_URL_PROD;

export const API_ENDPOINTS = {
  SEND_MESSAGE: `${API_BASE_URL}/v1/routes/message`,
  LOGIN: `${API_BASE_URL}/v1/routes/login`,
  SIGNUP_BASIC: `${API_BASE_URL}/v1/routes/signup/basic`,
  SIGNUP_DETAILS: `${API_BASE_URL}/v1/routes/signup/details`,
  USER_DETAILS: `${API_BASE_URL}/v1/routes/user/details`,
  GOOGLE_LOGIN: `${API_BASE_URL}/v1/routes/google-login`,
  LINKEDIN_LOGIN: `${API_BASE_URL}/v1/routes/linkedin-login`,
  LINKEDIN_UPSERT: `${API_BASE_URL}/v1/routes/upsert`,
  VERIFY_PROFILE_COMPLETION: `${API_BASE_URL}/v1/routes/is-profile-completed`,
  // Event Management Endpoints
  EVENTS_ALL: `${API_BASE_URL}/v1/routes/events/all`,
  EVENTS_PUBLIC: `${API_BASE_URL}/v1/routes/events/public`,
  EVENT_CREATE: `${API_BASE_URL}/v1/routes/events/create`,
  EVENT_UPDATE: `${API_BASE_URL}/v1/routes/events/update`,
  EVENT_DELETE: `${API_BASE_URL}/v1/routes/events/delete`,
  // Event Registration Endpoints
  EVENT_REGISTRATIONS: `${API_BASE_URL}/v1/routes/event-registrations`,
  EVENT_ATTENDEES: `${API_BASE_URL}/v1/routes/event-attendees`,
  EVENT_REGISTERED_USERS: `${API_BASE_URL}/v1/routes/event-registered-users`,
  SIMPLE_REGISTRATION: `${API_BASE_URL}/v1/routes/simple-registration`,
  // User Management Endpoints
  USERS_ALL: `${API_BASE_URL}/v1/routes/users/all`,
  CHECK_EMAIL: `${API_BASE_URL}/v1/routes/check-email`,
  // Upload Endpoints
  UPLOAD_IMAGE: `${API_BASE_URL}/v1/routes/upload/image`,
}; 