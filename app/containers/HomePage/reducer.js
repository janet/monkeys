import { fromJS } from 'immutable';

import {
  LOAD_STUDENT_CLASS_SCHEDULE,
  LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
  LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
  LOAD_CLASS_SCHEDULE,
  LOAD_CLASS_SCHEDULE_SUCCESS,
  LOAD_CLASS_SCHEDULE_ERROR,
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
  LOAD_CLASS_INSTANCE,
  LOAD_CLASS_INSTANCE_SUCCESS,
  LOAD_CLASS_INSTANCE_ERROR,
  LOAD_STUDENT_CLASS_INSTANCE,
  LOAD_STUDENT_CLASS_INSTANCE_SUCCESS,
  LOAD_STUDENT_CLASS_INSTANCE_ERROR,
  CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE,
} from './constants';

export const initialState = fromJS({
  studentClassSchedule: [],
  classSchedule: [],
  error: false,
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
    data: [],
  },
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STUDENT_CLASS_SCHEDULE:
      return state;
    case LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS:
      return state
        .set('studentClassSchedule', action.studentClassSchedule);
    case LOAD_STUDENT_CLASS_SCHEDULE_ERROR:
      return state
        .set('error', action.error);
    case LOAD_CLASS_SCHEDULE:
      return state;
    case LOAD_CLASS_SCHEDULE_SUCCESS:
      return state
        .set('classSchedule', action.classSchedule);
    case LOAD_CLASS_SCHEDULE_ERROR:
      return state
        .set('error', action.error);
    case LOAD_STUDENTS:
      return state
        .setIn(['students', 'loading'], true)
        .setIn(['students', 'error'], false);
    case LOAD_STUDENTS_SUCCESS:
      return state
        .setIn(['students', 'loading'], false)
        .setIn(['students', 'loaded'], true)
        .setIn(['students', 'error'], false)
        .mergeIn(['students', 'data'], action.students);
    case LOAD_STUDENTS_ERROR:
      return state
        .setIn(['students', 'loading'], false)
        .setIn(['students', 'loaded'], false)
        .mergeIn(['students', 'error'], action.error);
    case LOAD_CLASS_INSTANCE:
      return state
        .setIn(['classInstance', 'loading'], true)
        .setIn(['classInstance', 'error'], false);
    case LOAD_CLASS_INSTANCE_SUCCESS:
      return state
        .setIn(['classInstance', 'loading'], false)
        .setIn(['classInstance', 'loaded'], true)
        .setIn(['classInstance', 'error'], false)
        .mergeIn(['classInstance', 'data'], action.classInstance);
    case LOAD_CLASS_INSTANCE_ERROR:
      return state
        .setIn(['classInstance', 'loading'], false)
        .setIn(['classInstance', 'loaded'], false)
        .mergeIn(['classInstance', 'error'], action.error);
    case LOAD_STUDENT_CLASS_INSTANCE:
      return state
        .setIn(['studentClassInstance', 'loading'], true)
        .setIn(['studentClassInstance', 'error'], false);
    case LOAD_STUDENT_CLASS_INSTANCE_SUCCESS:
      return state
        .setIn(['studentClassInstance', 'loading'], false)
        .setIn(['studentClassInstance', 'loaded'], true)
        .setIn(['studentClassInstance', 'error'], false)
        .mergeIn(['studentClassInstance', 'data'], action.studentClassInstance);
    case LOAD_STUDENT_CLASS_INSTANCE_ERROR:
      return state
        .setIn(['studentClassInstance', 'loading'], false)
        .setIn(['studentClassInstance', 'loaded'], false)
        .mergeIn(['studentClassInstance', 'error'], action.error);
    case CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE: {
      const studentClassInstances = state.getIn(['studentClassInstance', 'data']);
      const studentClassInstanceIndex = studentClassInstances.findIndex(
        (studentClassInstance) => studentClassInstance.get('id') === action.studentClassInstanceId);
      return state
        .setIn(['studentClassInstance', 'data', studentClassInstanceIndex, 'attendance'], action.attendance);
    }
    default:
      return state;
  }
}

export default homePageReducer;
