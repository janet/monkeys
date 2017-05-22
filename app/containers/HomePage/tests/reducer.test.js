import expect from 'expect';
import { fromJS } from 'immutable';

import homePageReducer, { initialState } from '../reducer';
import {
  loadStudentClassSchedule,
  studentClassScheduleLoaded,
  studentClassScheduleLoadingError,
  loadClassSchedule,
  classScheduleLoaded,
  classScheduleLoadingError,
  loadStudents,
  studentsLoaded,
  studentsLoadingError,
  loadClassInstance,
  classInstanceLoaded,
  classInstanceLoadingError,
  loadStudentClassInstance,
  studentClassInstanceLoaded,
  studentClassInstanceLoadingError,
  changeStudentClassInstanceAttendance,
} from '../actions';

import { students, classInstance,
         studentClassInstance, errorMessage } from 'tests/fixtures';


describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
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

  it('should handle the loadClassSchedule action correctly', () => {
    const expectedResult = state;

    expect(homePageReducer(state, loadClassSchedule())).toEqual(expectedResult);
  });

  it('should handle the classScheduleLoaded action correctly', () => {
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

  it('should handle the loadStudents action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], true)
      .setIn(['students', 'error'], false);

    expect(homePageReducer(state, loadStudents())).toEqual(expected);
  });

  it('should handle the studentsLoaded action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], false)
      .setIn(['students', 'loaded'], true)
      .setIn(['students', 'data'], students);

    expect(homePageReducer(state, studentsLoaded(students))).toEqual(expected);
  });

  it('should handle the studentsLoadingError action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], false)
      .setIn(['students', 'loaded'], false)
      .setIn(['students', 'error'], errorMessage);

    expect(homePageReducer(state, studentsLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the loadClassInstance action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], true)
      .setIn(['classInstance', 'error'], false);

    expect(homePageReducer(state, loadClassInstance())).toEqual(expected);
  });

  it('should handle the classInstanceLoaded action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], false)
      .setIn(['classInstance', 'loaded'], true)
      .setIn(['classInstance', 'data'], classInstance);

    expect(homePageReducer(state, classInstanceLoaded(classInstance))).toEqual(expected);
  });

  it('should handle the classInstanceLoadingError action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], false)
      .setIn(['classInstance', 'loaded'], false)
      .setIn(['classInstance', 'error'], errorMessage);

    expect(homePageReducer(state, classInstanceLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the loadStudentClassInstance action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], true);

    expect(homePageReducer(state, loadStudentClassInstance())).toEqual(expected);
  });

  it('should handle the studentClassInstanceLoaded action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], false)
      .setIn(['studentClassInstance', 'loaded'], true)
      .setIn(['studentClassInstance', 'data'], studentClassInstance);

    expect(homePageReducer(state, studentClassInstanceLoaded(studentClassInstance))).toEqual(expected);
  });

  it('should handle the studentClassInstanceLoadingError action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], false)
      .setIn(['studentClassInstance', 'loaded'], false)
      .setIn(['studentClassInstance', 'error'], errorMessage);

    expect(homePageReducer(state, studentClassInstanceLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the changeStudentClassInstanceAttendance action correctly', () => {
    const studentClassInstanceIndex = 0;
    const attendance = 'T';
    const id = 1;
    const startingState = state
      .mergeIn(['studentClassInstance', 'data'], studentClassInstance);
    const expected = startingState
      .setIn(['studentClassInstance', 'data', studentClassInstanceIndex, 'attendance'], attendance);
    expect(homePageReducer(startingState, changeStudentClassInstanceAttendance(id, attendance))).toEqual(expected);
  });
});
