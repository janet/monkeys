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

// STUDENTS
export function loadStudents() {
  return {
    type: LOAD_STUDENTS,
  };
}

export function studentsLoaded(students) {
  return {
    type: LOAD_STUDENTS_SUCCESS,
    students,
  };
}

export function studentsLoadingError(error) {
  return {
    type: LOAD_STUDENTS_ERROR,
    error,
  };
}

// CLASS INSTANCE
export function loadClassInstance() {
  return {
    type: LOAD_CLASS_INSTANCE,
  };
}

export function classInstanceLoaded(classInstance) {
  return {
    type: LOAD_CLASS_INSTANCE_SUCCESS,
    classInstance,
  };
}

export function classInstanceLoadingError(error) {
  return {
    type: LOAD_CLASS_INSTANCE_ERROR,
    error,
  };
}

// STUDENT CLASS INSTANCE
export function loadStudentClassInstance() {
  return {
    type: LOAD_STUDENT_CLASS_INSTANCE,
  };
}

export function studentClassInstanceLoaded(studentClassInstance) {
  return {
    type: LOAD_STUDENT_CLASS_INSTANCE_SUCCESS,
    studentClassInstance,
  };
}

export function studentClassInstanceLoadingError(error) {
  return {
    type: LOAD_STUDENT_CLASS_INSTANCE_ERROR,
    error,
  };
}

export function changeStudentClassInstanceAttendance(studentClassInstanceId, attendance) {
  return {
    type: CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE,
    studentClassInstanceId,
    attendance,
  };
}
