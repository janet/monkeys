import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectLogin,
  selectIsAuthorized,
  selectError } from '../selectors';
import { initialState } from '../reducer';
import { errorMessage, isAuthorized } from 'tests/fixtures';


describe('selectLogin', () => {
  const loginSelector = selectLogin();
  it('should select the login state', () => {
    const mockedState = fromJS({
      login: initialState,
    });
    expect(loginSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectIsAuthorized', () => {
  const isAuthorizedSelector = selectIsAuthorized();
  it('should select isAuthorized', () => {
    const mockedState = fromJS({
      login: {
        isAuthorized,
      },
    });
    expect(isAuthorizedSelector(mockedState)).toEqual(isAuthorized);
  });
});

describe('selectError', () => {
  const errorSelector = selectError();
  it('should select the error', () => {
    const mockedState = fromJS({
      login: {
        error: errorMessage.msg,
      },
    });
    expect(errorSelector(mockedState)).toEqual(errorMessage.msg);
  });
});
