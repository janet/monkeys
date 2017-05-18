import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectLogin,
  selectEmail } from '../selectors';
import { initialState } from '../reducer';
import { email } from './fixtures';


describe('selectLogin', () => {
  const loginSelector = selectLogin();
  it('should select the login state', () => {
    const mockedState = fromJS({
      login: initialState,
    });
    expect(loginSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectEmail', () => {
  const emailSelector = selectEmail();
  it('should select the email', () => {
    const mockedState = fromJS({
      login: {
        email,
      },
    });
    expect(emailSelector(mockedState)).toEqual(email);
  });
});
