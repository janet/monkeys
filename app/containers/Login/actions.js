/*
 *
 * Login actions
 *
 */

import {
  PROCESS_LOGIN,
  PROCESS_LOGIN_SUCCESS,
  PROCESS_LOGIN_ERROR,
} from './constants';

export function processLogin(inputs) {
  return {
    type: PROCESS_LOGIN,
    inputs,
  };
}

export function loginProcessed(response) {
  if (response.success) {
    return {
      type: PROCESS_LOGIN_SUCCESS,
      email: response.success,
    };
  }
  return {
    type: PROCESS_LOGIN_ERROR,
    error: response.error,
  };
}

export function processingLoginError(error) {
  return {
    type: PROCESS_LOGIN_ERROR,
    error,
  };
}
