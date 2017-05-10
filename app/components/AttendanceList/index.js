/**
*
* AttendanceList
*
*/

import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';

import AttendanceCell from 'components/AttendanceCell';
import CenteredWrapper from 'components/Wrappers/CenteredWrapper';

function AttendanceList(props) {
  const {
    rowsCount,
    rowHeight,
    width,
    height,
    currentClassStudents,
    nameWidth,
    attendanceWidth,
    changeAttendance,
  } = props;

  return (
    <CenteredWrapper>
      <Table
        rowsCount={rowsCount}
        rowHeight={rowHeight}
        headerHeight={rowHeight}
        width={width}
        height={height}
      >
        <Column
          header={<Cell>Name</Cell>}
          cell={(columnProps) => (
            <Cell {...columnProps}>
              {currentClassStudents[columnProps.rowIndex].student.name_first}
            </Cell>
          )}
          width={nameWidth}
        />
        <Column
          header={<Cell>Attendance</Cell>}
          cell={(columnProps) => (
            <AttendanceCell
              columnProps={columnProps}
              attendance={currentClassStudents[columnProps.rowIndex].attendance}
              studentClassInstanceId={currentClassStudents[columnProps.rowIndex].id}
              changeAttendance={changeAttendance}
            />
          )}
          width={attendanceWidth}
        />
      </Table>
    </CenteredWrapper>
  );
}

AttendanceList.propTypes = {
  rowsCount: PropTypes.number,
  rowHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  nameWidth: PropTypes.number,
  attendanceWidth: PropTypes.number,
  currentClassStudents: PropTypes.array,
  changeAttendance: PropTypes.func,
};

export default AttendanceList;
