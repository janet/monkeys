/*
 *
 * Attendance reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
  LOAD_CLASS_INSTANCE,
  LOAD_CLASS_INSTANCE_SUCCESS,
  LOAD_CLASS_INSTANCE_ERROR,
} from './constants';

const initialState = fromJS({
  students: [],
  classInstance: {},
  currentClass: 1, // hardcode for now
  error: false,
});

function attendanceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STUDENTS:
      return state;
    case LOAD_STUDENTS_SUCCESS:
      return state
        .set('students', action.students);
    case LOAD_STUDENTS_ERROR:
      return state
        .set('error', action.error);
    case LOAD_CLASS_INSTANCE:
      return state;
    case LOAD_CLASS_INSTANCE_SUCCESS:
      return state
        .set('classInstance', action.classInstance);
    case LOAD_CLASS_INSTANCE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default attendanceReducer;
