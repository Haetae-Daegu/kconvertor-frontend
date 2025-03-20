import { useAuth } from "@/contexts/AuthContext";

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

/**
 * get the ID of the currently authenticated user
 * @returns the ID of the user or null if not authenticated
 */
export const getCurrentUserId = (): number | null => {
  const { user } = useAuth();
  return Number(user?.id) || null;
};

/**
 * check if the current user is the owner of a resource
 * @param resourceHostId the ID of the owner of the resource
 * @returns true if the current user is the owner
 */
export const isOwner = (resourceHostId: number): boolean => {
  const currentUserId = getCurrentUserId();
  return currentUserId !== null && currentUserId === resourceHostId;
}; 