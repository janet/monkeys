import expect from 'expect';
import { fromJS } from 'immutable';

import homePageReducer from '../reducer';
import {
  loadClassSchedule,
  classScheduleLoaded,
  classScheduleLoadingError,
} from '../actions';

describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      classSchedule: [],
      error: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadClassSchedule action correctly', () => {
    const expectedResult = state;

    expect(homePageReducer(state, loadClassSchedule())).toEqual(expectedResult);
  });

  it('should handle the classScheduleLoaded action correctly', () => {
    const fixture = 'Paul';
    const expectedResult = state
      .set('classSchedule', fixture);

    expect(homePageReducer(state, classScheduleLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the classScheduleLoadingError action correctly', () => {
    const fixture = {
      msg: 'i am error',
    };
    const expectedResult = state
      .set('error', fixture);

    expect(homePageReducer(state, classScheduleLoadingError(fixture))).toEqual(expectedResult);
  });
});
