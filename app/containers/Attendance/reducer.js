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
  LOAD_STUDENT_CLASS_INSTANCE,
  LOAD_STUDENT_CLASS_INSTANCE_SUCCESS,
  LOAD_STUDENT_CLASS_INSTANCE_ERROR,
} from './constants';

export const initialState = fromJS({
  students: {
    loading: false,
    loaded: false,
    error: false,
    data: [],
  },
  classInstance: {
    loading: false,
    loaded: false,
    error: false,
    data: {},
  },
  currentClass: 1, // hardcode for now
  studentClassInstance: {
    loading: false,
    loaded: false,
    error: false,
    data: {},
  },
});

function attendanceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STUDENTS:
      return state
        .setIn(['students', 'loading'], true)
        .setIn(['students', 'error'], false);
    case LOAD_STUDENTS_SUCCESS:
      return state
        .setIn(['students', 'loading'], false)
        .setIn(['students', 'loaded'], true)
        .setIn(['students', 'error'], false)
        .setIn(['students', 'data'], action.students);
    case LOAD_STUDENTS_ERROR:
      return state
        .setIn(['students', 'loading'], false)
        .setIn(['students', 'loaded'], false)
        .setIn(['students', 'error'], action.error);
    case LOAD_CLASS_INSTANCE:
      return state
        .setIn(['classInstance', 'loading'], true)
        .setIn(['classInstance', 'error'], false);
    case LOAD_CLASS_INSTANCE_SUCCESS:
      return state
        .setIn(['classInstance', 'loading'], false)
        .setIn(['classInstance', 'loaded'], true)
        .setIn(['classInstance', 'error'], false)
        .setIn(['classInstance', 'data'], action.classInstance);
    case LOAD_CLASS_INSTANCE_ERROR:
      return state
        .setIn(['classInstance', 'loading'], false)
        .setIn(['classInstance', 'loaded'], false)
        .setIn(['classInstance', 'error'], action.error);
    case LOAD_STUDENT_CLASS_INSTANCE:
      return state
        .setIn(['studentClassInstance', 'loading'], true)
        .setIn(['studentClassInstance', 'error'], false);
    case LOAD_STUDENT_CLASS_INSTANCE_SUCCESS:
      return state
        .setIn(['studentClassInstance', 'loading'], false)
        .setIn(['studentClassInstance', 'loaded'], true)
        .setIn(['studentClassInstance', 'error'], false)
        .setIn(['studentClassInstance', 'data'], action.studentClassInstance);
    case LOAD_STUDENT_CLASS_INSTANCE_ERROR:
      return state
        .setIn(['studentClassInstance', 'loading'], false)
        .setIn(['studentClassInstance', 'loaded'], false)
        .setIn(['studentClassInstance', 'error'], action.error);
    default:
      return state;
  }
}

export default attendanceReducer;
