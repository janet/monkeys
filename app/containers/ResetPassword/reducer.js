/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export const initialState = fromJS({
  isAuthorized: false,
  error: false,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD:
      return state;
    case RESET_PASSWORD_SUCCESS:
      return state;
    case RESET_PASSWORD_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default resetPasswordReducer;
