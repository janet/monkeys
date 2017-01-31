import {
  LOAD_CLASS_SCHEDULE,
  LOAD_CLASS_SCHEDULE_SUCCESS,
  LOAD_CLASS_SCHEDULE_ERROR,
} from './constants';

export function loadClassSchedule() {
  return {
    type: LOAD_CLASS_SCHEDULE,
  };
}

export function classScheduleLoaded(classSchedule) {
  return {
    type: LOAD_CLASS_SCHEDULE_SUCCESS,
    classSchedule,
  };
}

export function classScheduleLoadingError(error) {
  return {
    type: LOAD_CLASS_SCHEDULE_ERROR,
    error,
  };
}
