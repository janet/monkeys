/*
 *
 * Logout actions
 *
 */
import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccess(response) {
  if (response.error) {
    return {
      type: LOGOUT_ERROR,
      error: response.error,
    };
  }
  return {
    type: LOGOUT_SUCCESS,
    loggedIn: response,
  };
}

export function loggingOutError(response) {
  return {
    type: LOGOUT_ERROR,
    error: response,
  };
}
