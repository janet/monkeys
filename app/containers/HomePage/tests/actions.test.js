import expect from 'expect';

import {
  LOAD_CLASS_SCHEDULE,
  LOAD_CLASS_SCHEDULE_SUCCESS,
  LOAD_CLASS_SCHEDULE_ERROR,
} from '../constants';

import {
  loadClassSchedule,
  classScheduleLoaded,
  classScheduleLoadingError,
} from '../actions';

describe('homePage Actions', () => {
  describe('loadClassSchedule', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_CLASS_SCHEDULE,
      };

      expect(loadClassSchedule()).toEqual(expectedResult);
    });
  });

  describe('classScheduleLoaded', () => {
    it('should return the correct type and the passed class schedule', () => {
      const fixture = 'Paul';
      const expectedResult = {
        type: LOAD_CLASS_SCHEDULE_SUCCESS,
        classSchedule: fixture,
      };

      expect(classScheduleLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('classScheduleLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_CLASS_SCHEDULE_ERROR,
        error: fixture,
      };

      expect(classScheduleLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
