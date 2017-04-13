import expect from 'expect';
import { fromJS } from 'immutable';

import {
  loadStudents,
  studentsLoaded,
  studentsLoadingError,
  loadClassInstance,
  classInstanceLoaded,
  classInstanceLoadingError,
  loadStudentClassInstance,
  studentClassInstanceLoaded,
  studentClassInstanceLoadingError,
  changeStudentClassInstanceAttendance,
} from '../actions';

import {
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
} from '../constants';

import { tardyAttendance, studentClassInstanceId } from './fixtures';

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

  describe('loadClassInstance', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOAD_CLASS_INSTANCE,
      };
      expect(loadClassInstance()).toEqual(expected);
    });
  });

  describe('classInstanceLoaded', () => {
    it('should return the correct type and the passed classInstance', () => {
      const fixture = { date: 'Mon, 05/02/16' };
      const expected = {
        type: LOAD_CLASS_INSTANCE_SUCCESS,
        classInstance: fixture,
      };

      expect(classInstanceLoaded(fixture)).toEqual(expected);
    });
  });

  describe('classInstanceLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something is wrong',
      };
      const expected = {
        type: LOAD_CLASS_INSTANCE_ERROR,
        error: fixture,
      };

      expect(classInstanceLoadingError(fixture)).toEqual(expected);
    });
  });

  describe('loadStudentClassInstance', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOAD_STUDENT_CLASS_INSTANCE,
      };

      expect(loadStudentClassInstance()).toEqual(expected);
    });
  });

  describe('studentClassInstanceLoaded', () => {
    it('should return the correct type and the passed student class instance', () => {
      const fixture = [
        fromJS({
          student_id: 1,
          class_instance_id: 1,
        }),
        fromJS({
          student_id: 2,
          class_instance_id: 1,
        }),
      ];
      const expected = {
        type: LOAD_STUDENT_CLASS_INSTANCE_SUCCESS,
        studentClassInstance: fixture,
      };

      expect(studentClassInstanceLoaded(fixture)).toEqual(expected);
    });
  });

  describe('studentClassInstanceLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'i is error',
      };
      const expected = {
        type: LOAD_STUDENT_CLASS_INSTANCE_ERROR,
        error: fixture,
      };

      expect(studentClassInstanceLoadingError(fixture)).toEqual(expected);
    });
  });

  describe('changeStudentClassInstanceAttendance', () => {
    it('should return the correct type and the passed attendance and studentClassInstanceId', () => {
      const expected = {
        type: CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE,
        attendance: tardyAttendance,
        studentClassInstanceId,
      };

      expect(changeStudentClassInstanceAttendance(studentClassInstanceId, tardyAttendance)).toEqual(expected);
    });
  });
});
