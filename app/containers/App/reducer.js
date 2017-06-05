import { fromJS } from 'immutable';

import authorize from 'containers/Login/authorize';
import { LOGOUT_SUCCESS, LOGOUT_ERROR } from './constants';

export const initialState = fromJS({
  loggedIn: false,
  error: false,
});

function authorizeReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return state
        .set('loggedIn', action.loggedIn);
    case LOGOUT_ERROR:
      return state
        .set('error', action.error);
    default:
      return state
        .set('loggedIn', authorize.loggedIn());
  }
}

export default authorizeReducer;
