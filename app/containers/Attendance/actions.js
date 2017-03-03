/*
 *
 * Attendance actions
 *
 */

import {
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
} from './constants';

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
