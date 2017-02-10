import expect from 'expect';

import {
  LOAD_STUDENT_CLASS_SCHEDULE,
  LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
  LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
} from '../constants';

import {
  loadStudentClassSchedule,
  studentClassScheduleLoaded,
  studentClassScheduleLoadingError,
} from '../actions';

describe('homePage Actions', () => {
  describe('loadStudentClassSchedule', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_STUDENT_CLASS_SCHEDULE,
      };

      expect(loadStudentClassSchedule()).toEqual(expectedResult);
    });
  });

  describe('studentClassScheduleLoaded', () => {
    it('should return the correct type and the passed class schedule', () => {
      const fixture = 'Paul';
      const expectedResult = {
        type: LOAD_STUDENT_CLASS_SCHEDULE_SUCCESS,
        studentClassSchedule: fixture,
      };

      expect(studentClassScheduleLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('studentClassScheduleLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_STUDENT_CLASS_SCHEDULE_ERROR,
        error: fixture,
      };

      expect(studentClassScheduleLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
