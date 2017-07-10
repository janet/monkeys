import { createSelector } from 'reselect';
import { EMPTY_IMMUTABLE_OBJECT } from 'tests/fixtures';

/**
 * Direct selector to the register state domain
 */
const selectRegister = () => (state) => {
  if (state.has('register')) {
    return state.get('register');
  }
  return EMPTY_IMMUTABLE_OBJECT;
};

/**
 * Other specific selectors
 */

const selectError = () => createSelector(
  selectRegister(),
  (registerState) => registerState.get('error')
);

const selectSuccess = () => createSelector(
  selectRegister(),
  (registerState) => {
    if (registerState.has('success')) {
      return registerState.get('success');
    }
    return EMPTY_IMMUTABLE_OBJECT;
  }
);

export {
  selectRegister,
  selectError,
  selectSuccess,
};
