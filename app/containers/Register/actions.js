/*
 *
 * Register actions
 *
 */
import { fromJS } from 'immutable';

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

export function register(data) {
  if (data) {
    return {
      type: REGISTER,
      data: fromJS({
        email: data.get('email').toLowerCase(),
        password: data.get('password'),
        nameFirst: data.get('nameFirst'),
        nameLast: data.get('nameLast'),
      }),
    };
  }
  return {
    type: REGISTER,
    data,
  };
}

export function registerSuccess(response) {
  if (response.error) {
    return {
      type: REGISTER_ERROR,
      error: response.error,
    };
  } else if (response) {
    return {
      type: REGISTER_SUCCESS,
    };
  }
  return {
    type: REGISTER_ERROR,
    error: response,
  };
}

export function registeringError(error) {
  return {
    type: REGISTER_ERROR,
    error,
  };
}
