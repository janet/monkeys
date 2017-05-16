/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PROCESS_LOGIN,
  PROCESS_LOGIN_SUCCESS,
  PROCESS_LOGIN_ERROR,
} from './constants';

export const initialState = fromJS({
  email: '',
  error: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case PROCESS_LOGIN:
      return state;
    case PROCESS_LOGIN_SUCCESS:
      return state
        .set('email', action.email);
    case PROCESS_LOGIN_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default loginReducer;
