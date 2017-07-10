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
  RESET_REGISTER,
} from './constants';

export const initialState = fromJS({
  error: false,
  success: false,
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    case REGISTER_SUCCESS:
      return state
        .set('success', true);
    case REGISTER_ERROR:
      return state
        .set('success', false)
        .set('error', action.error);
    case RESET_REGISTER:
      return initialState;
    default:
      return state;
  }
}

export default registerReducer;
