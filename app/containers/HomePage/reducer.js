import { fromJS } from 'immutable';

import {
  LOAD_CLASS_SCHEDULE,
  LOAD_CLASS_SCHEDULE_SUCCESS,
  LOAD_CLASS_SCHEDULE_ERROR,
} from './constants';

const initialState = fromJS({
  classSchedule: [],
  error: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CLASS_SCHEDULE:
      return state;
    case LOAD_CLASS_SCHEDULE_SUCCESS:
      return state
        .set('classSchedule', action.classSchedule);
    case LOAD_CLASS_SCHEDULE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default homePageReducer;
