import { getStorage } from "../util/storage.js";

// Naïve check for login status.
// For further security, this could be upgraded to a GET request
export function isAuthenticated() {
  const auth = getStorage('auth', true);
    
  if (auth.user) {
    return true;
  }

  return false;
}