import {
  LOAD_STUDENT_CLASS_SCHEDULE,
  LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
  LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
} from './constants';

export function loadStudentClassSchedule() {
  return {
    type: LOAD_STUDENT_CLASS_SCHEDULE,
  };
}

export function studentClassScheduleLoaded(studentClassSchedule) {
  return {
    type: LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
    studentClassSchedule,
  };
}

export function studentClassScheduleLoadingError(error) {
  return {
    type: LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
    error,
  };
}
