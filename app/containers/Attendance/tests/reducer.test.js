import expect from 'expect';
import { fromJS } from 'immutable';

import attendanceReducer from '../reducer';
import {
  loadStudents,
  studentsLoaded,
  studentsLoadingError,
  loadClassInstance,
  classInstanceLoaded,
  classInstanceLoadingError,
} from '../actions';


describe('attendanceReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      students: [],
      classInstance: {},
      currentClass: 1,
      error: false,
    });
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(attendanceReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the loadStudents action correctly', () => {
    const expected = state;

    expect(attendanceReducer(state, loadStudents())).toEqual(expected);
  });

  it('should handle the studentsLoaded action correctly', () => {
    const fixture = [
      fromJS({
        id: 1,
        student_name: 'Paul',
        rank_stripes: 2,
        program: 'Gorilla',
      }),
    ];
    const expected = state
      .set('students', fixture);

    expect(attendanceReducer(state, studentsLoaded(fixture))).toEqual(expected);
  });

  it('should handle the studentsLoadingError action correctly', () => {
    const fixture = {
      msg: 'i am error',
    };
    const expected = state
      .set('error', fixture);

    expect(attendanceReducer(state, studentsLoadingError(fixture))).toEqual(expected);
  });

  it('should handle the loadClassInstance action correctly', () => {
    const expected = state;

    expect(attendanceReducer(state, loadClassInstance())).toEqual(expected);
  });

  it('should handle the classInstanceLoaded action correctly', () => {
    const fixture = fromJS({
      substitute_coach_id: null,
      id: 1,
      notes: null,
      class_schedule_id: 1,
      date: 'Mon, 05/02/16',
    });
    const expected = state.set('classInstance', fixture);

    expect(attendanceReducer(state, classInstanceLoaded(fixture))).toEqual(expected);
  });

  it('should handle the classInstanceLoadingError action correctly', () => {
    const fixture = {
      msg: 'i am error',
    };
    const expected = state
      .set('error', fixture);

    expect(attendanceReducer(state, classInstanceLoadingError(fixture))).toEqual(expected);
  });
});
