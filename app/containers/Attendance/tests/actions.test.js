import expect from 'expect';

import {
  loadStudents,
  studentsLoaded,
  studentsLoadingError,
} from '../actions';

import {
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
} from '../constants';

describe('Attendance actions', () => {
  describe('loadStudents', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOAD_STUDENTS,
      };
      expect(loadStudents()).toEqual(expected);
    });
  });

  describe('studentsLoaded', () => {
    it('should return the correct type and the passed students', () => {
      const fixture = [{ student: 'Paul' }];
      const expected = {
        type: LOAD_STUDENTS_SUCCESS,
        students: fixture,
      };

      expect(studentsLoaded(fixture)).toEqual(expected);
    });
  });

  describe('studentsLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expected = {
        type: LOAD_STUDENTS_ERROR,
        error: fixture,
      };

      expect(studentsLoadingError(fixture)).toEqual(expected);
    });
  });
});
