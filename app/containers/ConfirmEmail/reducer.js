/*
 *
 * ConfirmEmail reducer
 *
 */
import { fromJS } from 'immutable';
import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
} from './constants';


export const initialState = fromJS({
  error: false,
  loading: false,
  loaded: false,
  data: {
    emailConfirmed: false,
    token: '',
  },
});

function confirmEmailReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_EMAIL:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', false)
        .setIn(['data', 'token'], action.token);
    case CONFIRM_EMAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .setIn(['data', 'emailConfirmed'], !!action.emailConfirmed);
    case CONFIRM_EMAIL_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default confirmEmailReducer;
