/*
 *
 * ResetPassword actions
 *
 */

import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';


export function resetPassword(data) {
  return {
    type: RESET_PASSWORD,
    data,
  };
}

export function resetPasswordSuccess(response) {
  if (response.error) {
    return {
      type: RESET_PASSWORD_ERROR,
      error: response.error,
    };
  } else if (response) {
    return {
      type: RESET_PASSWORD_SUCCESS,
      isAuthorized: response,
    };
  }
  return {
    type: RESET_PASSWORD_ERROR,
    error: response,
  };
}

export function resettingPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error,
  };
}
