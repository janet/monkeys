/**
*
* AttendanceCell
*
*/

import React, { PropTypes } from 'react';
import { Cell } from 'fixed-data-table-2';
import StyledAttendanceButton from './StyledAttendanceButton';


export const attendanceIcon = {
  A: 'fa fa-square-o',
  P: 'fa fa-check-square-o',
  T: 'fa fa-minus-square-o',
};

const attendanceChange = {
  P: 'T',
  T: 'A',
  A: 'P',
};

function AttendanceCell(props) {
  const {
    attendance,
    columnProps,
    changeAttendance,
    studentClassInstanceId,
  } = props;

  return (
    <Cell {...columnProps}>
      <StyledAttendanceButton onClick={() => changeAttendance(studentClassInstanceId, attendanceChange[attendance])}>
        <i className={attendanceIcon[attendance]} />
      </StyledAttendanceButton>
    </Cell>
  );
}

AttendanceCell.propTypes = {
  changeAttendance: PropTypes.func,
  attendance: PropTypes.string,
  columnProps: PropTypes.object,
  studentClassInstanceId: PropTypes.number,
};

export default AttendanceCell;
