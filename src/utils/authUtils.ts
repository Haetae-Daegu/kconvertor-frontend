/**
 * authUtils.ts
 */

/**
 * utils for authentication
/**
 * get the authorization header with the JWT token
 * @returns an object containing the Authorization header
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('auth_token');
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * check if the user is currently authenticated
 * @returns true if a token is present in the localStorage
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
}; 