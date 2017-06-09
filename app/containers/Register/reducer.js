/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

export const initialState = fromJS({
  error: false,
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case REGISTER_SUCCESS:
      return state;
    case REGISTER_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default registerReducer;
