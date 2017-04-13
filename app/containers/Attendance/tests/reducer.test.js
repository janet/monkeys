import expect from 'expect';

import attendanceReducer, { initialState } from '../reducer';
import {
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
import { students, classInstance, studentClassInstance, errorMessage } from './fixtures';


describe('attendanceReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expected = state;
    expect(attendanceReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the loadStudents action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], true)
      .setIn(['students', 'error'], false);

    expect(attendanceReducer(state, loadStudents())).toEqual(expected);
  });

  it('should handle the studentsLoaded action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], false)
      .setIn(['students', 'loaded'], true)
      .setIn(['students', 'data'], students);

    expect(attendanceReducer(state, studentsLoaded(students))).toEqual(expected);
  });

  it('should handle the studentsLoadingError action correctly', () => {
    const expected = state
      .setIn(['students', 'loading'], false)
      .setIn(['students', 'loaded'], false)
      .setIn(['students', 'error'], errorMessage);

    expect(attendanceReducer(state, studentsLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the loadClassInstance action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], true)
      .setIn(['classInstance', 'error'], false);

    expect(attendanceReducer(state, loadClassInstance())).toEqual(expected);
  });

  it('should handle the classInstanceLoaded action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], false)
      .setIn(['classInstance', 'loaded'], true)
      .setIn(['classInstance', 'data'], classInstance);

    expect(attendanceReducer(state, classInstanceLoaded(classInstance))).toEqual(expected);
  });

  it('should handle the classInstanceLoadingError action correctly', () => {
    const expected = state
      .setIn(['classInstance', 'loading'], false)
      .setIn(['classInstance', 'loaded'], false)
      .setIn(['classInstance', 'error'], errorMessage);

    expect(attendanceReducer(state, classInstanceLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the loadStudentClassInstance action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], true);

    expect(attendanceReducer(state, loadStudentClassInstance())).toEqual(expected);
  });

  it('should handle the studentClassInstanceLoaded action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], false)
      .setIn(['studentClassInstance', 'loaded'], true)
      .setIn(['studentClassInstance', 'data'], studentClassInstance);

    expect(attendanceReducer(state, studentClassInstanceLoaded(studentClassInstance))).toEqual(expected);
  });

  it('should handle the studentClassInstanceLoadingError action correctly', () => {
    const expected = state
      .setIn(['studentClassInstance', 'loading'], false)
      .setIn(['studentClassInstance', 'loaded'], false)
      .setIn(['studentClassInstance', 'error'], errorMessage);

    expect(attendanceReducer(state, studentClassInstanceLoadingError(errorMessage))).toEqual(expected);
  });

  it('should handle the changeStudentClassInstanceAttendance action correctly', () => {
    const studentClassInstanceIndex = 0;
    const attendance = 'T';
    const id = 1;
    const startingState = state
      .mergeIn(['studentClassInstance', 'data'], studentClassInstance);
    const expected = startingState
      .setIn(['studentClassInstance', 'data', studentClassInstanceIndex, 'attendance'], attendance);
    expect(attendanceReducer(startingState, changeStudentClassInstanceAttendance(id, attendance))).toEqual(expected);
  });
});
