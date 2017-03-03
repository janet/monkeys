import { fromJS } from 'immutable';
import expect from 'expect';

import { selectAttendance, selectStudents } from '../selectors';

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
