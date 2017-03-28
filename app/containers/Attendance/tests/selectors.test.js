import { fromJS } from 'immutable';
import expect from 'expect';

import { selectAttendance, selectStudents,
         selectClassInstance, selectCurrentClass,
         selectStudentClassInstance } from '../selectors';

import { students, classInstance, studentClassInstance, currentClass } from './fixtures';

describe('selectAttendance', () => {
  const attendanceSelector = selectAttendance();

  it('should select the attendance state', () => {
    const attendanceState = fromJS({
      attendance: {},
    });
    const mockedState = fromJS({
      attendance: attendanceState,
    });
    expect(attendanceSelector(mockedState)).toEqual(attendanceState);
  });
});

describe('selectStudents', () => {
  const studentsSelector = selectStudents();
  it('should select the students', () => {
    const mockedState = fromJS({
      attendance: {
        students: {
          data: students,
          loaded: false,
          loading: false,
          error: false,
        },
      },
    });
    const expected = fromJS({
      data: students,
      loaded: false,
      loading: false,
      error: false,
    });
    expect(studentsSelector(mockedState)).toEqual(expected);
  });
});

describe('selectClassInstance', () => {
  const classInstanceSelector = selectClassInstance();
  it('should select the class instance', () => {
    const mockedState = fromJS({
      attendance: {
        classInstance: {
          data: classInstance,
          loading: false,
          error: false,
        },
      },
    });
    const expected = fromJS({
      data: classInstance,
      loading: false,
      error: false,
    });
    expect(classInstanceSelector(mockedState)).toEqual(expected);
  });
});

describe('selectCurrentClass', () => {
  const currentClassSelector = selectCurrentClass();
  it('should select the current class', () => {
    const mockedState = fromJS({
      attendance: {
        currentClass: {
          data: currentClass,
          loading: false,
          error: false,
        },
      },
    });
    const expected = fromJS({
      data: currentClass,
      loading: false,
      error: false,
    });
    expect(currentClassSelector(mockedState)).toEqual(expected);
  });
});

describe('selectStudentClassInstance', () => {
  const studentClassInstanceSelector = selectStudentClassInstance();
  it('should select the student class instance', () => {
    const mockedState = fromJS({
      attendance: {
        studentClassInstance: {
          data: studentClassInstance,
          loading: false,
          error: false,
        },
      },
    });
    const expected = fromJS({
      data: studentClassInstance,
      loading: false,
      error: false,
    });
    expect(studentClassInstanceSelector(mockedState)).toEqual(expected);
  });
});
