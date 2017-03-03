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
} from './constants';

const initialState = fromJS({
  students: [],
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
    default:
      return state;
  }
}

export default attendanceReducer;
