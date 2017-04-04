import AttendanceCell, { attendanceIcon } from '../index';
import StyledAttendanceButton from '../StyledAttendanceButton';

import { Cell } from 'fixed-data-table-2';
import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<AttendanceCell />', () => {
  it('should render an attendanceButton', () => {
    const changeAttendanceSpy = expect.createSpy();
    const attendance = 'P';
    const renderedComponent = mount(
      <AttendanceCell
        changeAttendance={changeAttendanceSpy}
        attendance={attendance}
        columnProps={{ columnKey: undefined, height: 50, width: 150, rowIndex: 1 }}
        studentClassInstanceId={1}
      />
    );
    expect(renderedComponent.find(Cell).length).toEqual(1);
    expect(renderedComponent.find(StyledAttendanceButton).length).toEqual(1);
    renderedComponent.find(StyledAttendanceButton).simulate('click');
    expect(changeAttendanceSpy).toHaveBeenCalled();

    const attendanceIconComponent = (
      <i className={attendanceIcon[attendance]} />
    );
    expect(renderedComponent.contains(attendanceIconComponent)).toEqual(true);
  });
});
