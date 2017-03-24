import { fromJS } from 'immutable';
import expect from 'expect';

import { selectAttendance, selectStudents,
         selectClassInstance, selectCurrentClass,
         selectStudentClassInstance } from '../selectors';

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
    const students =
      fromJS({
        id: 1,
        student_name: 'Paul',
        rank_stripes: 2,
        program: 'Gorilla',
      });
    const mockedState = fromJS({
      attendance: {
        students,
      },
    });
    expect(studentsSelector(mockedState)).toEqual(students);
  });
});

describe('selectClassInstance', () => {
  const classInstanceSelector = selectClassInstance();
  it('should select the class instance', () => {
    const classInstance =
      fromJS({
        substitute_coach_id: null,
        id: 1,
        notes: null,
        class_schedule_id: 1,
        date: 'Mon, 05/02/16',
      });
    const mockedState = fromJS({
      attendance: {
        classInstance,
      },
    });
    expect(classInstanceSelector(mockedState)).toEqual(classInstance);
  });
});

describe('selectCurrentClass', () => {
  const currentClassSelector = selectCurrentClass();
  it('should select the current class', () => {
    const currentClass = 1;
    const mockedState = fromJS({
      attendance: {
        currentClass,
      },
    });
    expect(currentClassSelector(mockedState)).toEqual(currentClass);
  });
});

describe('selectStudentClassInstance', () => {
  const studentClassInstanceSelector = selectStudentClassInstance();
  it('should select the student class instance', () => {
    const studentClassInstance = fromJS([
      {
        student_id: 1,
        class_instance_id: 1,
      },
      {
        student_id: 2,
        class_instance_id: 1,
      },
    ]);
    const mockedState = fromJS({
      attendance: {
        studentClassInstance,
      },
    });
    expect(studentClassInstanceSelector(mockedState)).toEqual(studentClassInstance);
  });
});
