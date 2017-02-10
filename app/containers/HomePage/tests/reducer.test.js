import expect from 'expect';
import { fromJS } from 'immutable';

import homePageReducer from '../reducer';
import {
  loadStudentClassSchedule,
  studentClassScheduleLoaded,
  studentClassScheduleLoadingError,
} from '../actions';

describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      studentClassSchedule: [],
      error: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadStudentClassSchedule action correctly', () => {
    const expectedResult = state;

    expect(homePageReducer(state, loadStudentClassSchedule())).toEqual(expectedResult);
  });

  it('should handle the studentClassScheduleLoaded action correctly', () => {
    const fixture = [
      fromJS({
        student_id: 1,
        id: 3,
        class_schedule_id: 3,
      }),
      fromJS({
        student_id: 4,
        id: 6,
        class_schedule_id: 3,
      }),
    ];
    const expectedResult = state
      .set('studentClassSchedule', fixture);

    expect(homePageReducer(state, studentClassScheduleLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the studentClassScheduleLoadingError action correctly', () => {
    const fixture = {
      msg: 'i am error',
    };
    const expectedResult = state
      .set('error', fixture);

    expect(homePageReducer(state, studentClassScheduleLoadingError(fixture))).toEqual(expectedResult);
  });
});
