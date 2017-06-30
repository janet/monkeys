/*
 *
 * ConfirmEmail actions
 *
 */
import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
} from './constants';

export function processConfirm(token) {
  return {
    type: CONFIRM_EMAIL,
    token,
  };
}

export function emailConfirmed(response) {
  if (response.error) {
    return {
      type: CONFIRM_EMAIL_ERROR,
      error: response.error,
    };
  } else if (response) {
    return {
      type: CONFIRM_EMAIL_SUCCESS,
      emailConfirmed: !!response.success,
    };
  }
  return {
    type: CONFIRM_EMAIL_ERROR,
    error: response,
  };
}

export function confirmingEmailError(error) {
  return {
    type: CONFIRM_EMAIL_ERROR,
    error,
  };
}
