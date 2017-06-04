import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHomePage,
  selectStudentClassSchedule,
  selectClassSchedule,
  selectStudents,
  selectClassInstance,
  selectCurrentClass,
  selectStudentClassInstance,
} from '../selectors';

import { students, classInstance,
         studentClassInstance, currentClass } from 'tests/fixtures';


// HomePage
describe('selectHomePage', () => {
  const homePageSelector = selectHomePage();
  it('should select the homePage state', () => {
    const homePageState = fromJS({
      homePage: {},
    });
    const mockedState = fromJS({
      homePage: homePageState,
    });
    expect(homePageSelector(mockedState)).toEqual(homePageState);
  });
});

describe('selectStudentClassSchedule', () => {
  const studentClassScheduleSelector = selectStudentClassSchedule();
  it('should select the studentClassSchedule', () => {
    const studentClassSchedule = 'Youth Jiu Jitsu';
    const mockedState = fromJS({
      homePage: {
        studentClassSchedule,
      },
    });
    expect(studentClassScheduleSelector(mockedState)).toEqual(studentClassSchedule);
  });
});

describe('selectClassSchedule', () => {
  const classScheduleSelector = selectClassSchedule();
  it('should select the classSchedule', () => {
    const classSchedule = 'Youth Jiu Jitsu';
    const mockedState = fromJS({
      homePage: {
        classSchedule,
      },
    });
    expect(classScheduleSelector(mockedState)).toEqual(classSchedule);
  });
});

// Attendance
describe('selectStudents', () => {
  const studentsSelector = selectStudents();
  it('should select the students', () => {
    const mockedState = fromJS({
      homePage: {
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
      homePage: {
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
      homePage: {
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
      homePage: {
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

