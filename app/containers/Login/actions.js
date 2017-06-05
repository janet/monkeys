/*
 *
 * Login actions
 *
 */
import { fromJS } from 'immutable';

import {
  AUTHORIZE,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_ERROR,
} from './constants';

export function authorize(data) {
  if (data) {
    return {
      type: AUTHORIZE,
      data: fromJS({
        email: data.get('email').toLowerCase(),
        password: data.get('password'),
      }),
    };
  }
  return {
    type: AUTHORIZE,
    data,
  };
}


export function authorizedSuccess(response) {
  if (response.error) {
    return {
      type: AUTHORIZE_ERROR,
      error: response.error,
    };
  } else if (response) {
    return {
      type: AUTHORIZE_SUCCESS,
      isAuthorized: response,
    };
  }
  return {
    type: AUTHORIZE_ERROR,
    error: response,
  };
}

export function authorizingError(error) {
  return {
    type: AUTHORIZE_ERROR,
    error,
  };
}
