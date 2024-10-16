// src/utils/authToken.js
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Set token in cookies with the same expiry as in the token itself
export const setAuthToken = (token) => {
  if (token) {
    // Decode the token to get the expiration time (exp is in seconds)
    const { exp } = jwtDecode(token);

    // Calculate expiration time in milliseconds
    const expiresInMs = exp * 1000 - Date.now();

    // Set the cookie to expire when the token expires
    Cookies.set('token', token, { expires: expiresInMs / (24 * 60 * 60 * 1000) }); // converting milliseconds to days
  }
};

// Get token from cookies
export const getAuthToken = () => {
  return Cookies.get('token');
};

// Check if token is expired
export const isTokenExpired = () => {
  const token = getAuthToken();
  if (token) {
    const { exp } = jwtDecode(token);  // Extract expiration from token
    return Date.now() >= exp * 1000;    // Check if the token is expired
  }
  return true; // Return true if no token found, i.e., token is "expired"
};
