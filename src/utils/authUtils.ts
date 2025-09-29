import { toast } from "sonner";

/**
 * Handle API response errors, specifically token expiration
 * @param response - The fetch response object
 * @param defaultMessage - Default error message if no specific handling
 * @returns boolean indicating if the error was handled
 */
export const handleApiError = (response: Response, defaultMessage: string = "An error occurred"): boolean => {
  if (response.status === 401 || response.status === 403) {
    // Token expired or unauthorized
    toast.error("Please login again", {
      description: "Your session has expired. Please log in to continue.",
      action: {
        label: "Login",
        onClick: () => {
          // Clear stored tokens
          localStorage.removeItem('csaTokens');
          localStorage.removeItem('csaUser');
          // Redirect to login or refresh page
          window.location.href = '/';
        }
      }
    });
    return true;
  }
  
  if (!response.ok) {
    toast.error(defaultMessage);
    return false;
  }
  
  return false;
};

/**
 * Check if an error is related to authentication
 * @param error - The error object
 * @returns boolean indicating if it's an auth error
 */
export const isAuthError = (error: any): boolean => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('unauthorized') || 
           message.includes('token') || 
           message.includes('expired') ||
           message.includes('401') ||
           message.includes('403');
  }
  return false;
};

/**
 * Handle authentication errors with user-friendly message
 * @param error - The error object
 */
export const handleAuthError = (error: any): void => {
  if (isAuthError(error)) {
    toast.error("Please login again", {
      description: "Your session has expired. Please log in to continue.",
      action: {
        label: "Login",
        onClick: () => {
          // Clear stored tokens
          localStorage.removeItem('csaTokens');
          localStorage.removeItem('csaUser');
          // Redirect to login or refresh page
          window.location.href = '/';
        }
      }
    });
  } else {
    toast.error(error instanceof Error ? error.message : "An error occurred");
  }
};

