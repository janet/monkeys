import { fromJS } from 'immutable';
import expect from 'expect';

import { selectResetPassword,
         selectIsAuthorized,
         selectError } from '../selectors';
import { initialState } from '../reducer';
import { errorMessage, isAuthorized } from 'tests/fixtures';


describe('selectResetPassword', () => {
  const resetPasswordSelector = selectResetPassword();
  it('should select the resetPassword state', () => {
    const mockedState = fromJS({
      resetPassword: initialState,
    });
    expect(resetPasswordSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectIsAuthorized', () => {
  const isAuthorizedSelector = selectIsAuthorized();
  it('should select isAuthorized', () => {
    const mockedState = fromJS({
      resetPassword: {
        isAuthorized,
      },
    });
    expect(isAuthorizedSelector(mockedState)).toEqual(isAuthorized);
  });
});

describe('selectError in ResetPassword', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const mockedState = fromJS({
      resetPassword: {
        error: errorMessage.msg,
      },
    });
    expect(errorSelector(mockedState)).toEqual(errorMessage.msg);
  });
});
