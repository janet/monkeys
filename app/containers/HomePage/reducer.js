import { fromJS } from 'immutable';

import {
  LOAD_STUDENT_CLASS_SCHEDULE,
  LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
  LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
} from './constants';

const initialState = fromJS({
  studentClassSchedule: [],
  error: false,
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
    default:
      return state;
  }
}

export default homePageReducer;
