import { fromJS } from 'immutable';
import expect from 'expect';

import { selectLocationState,
         selectApp,
         selectLoggedIn } from '../selectors';
import { initialState } from '../reducer';


describe('selectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selectLocationState()(mockedState)).toEqual(route.toJS());
  });
});

describe('selectApp', () => {
  const appSelector = selectApp();
  it('should select the app state', () => {
    const mockedState = fromJS({
      app: initialState,
    });
    expect(appSelector(mockedState)).toEqual(initialState);
  });
});

describe('selectLoggedIn', () => {
  const loggedInSelector = selectLoggedIn();
  it('should select loggedIn', () => {
    const mockedState = fromJS({
      app: {
        loggedIn: true,
      },
    });
    expect(loggedInSelector(mockedState)).toEqual(true);
  });
});
