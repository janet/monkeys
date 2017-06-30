/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AUTHORIZE,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_ERROR,
} from './constants';

export const initialState = fromJS({
  isAuthorized: false,
  error: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE:
      return state;
    case AUTHORIZE_SUCCESS:
      return state
        .set('isAuthorized', action.isAuthorized)
        .set('error', false);
    case AUTHORIZE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default loginReducer;
