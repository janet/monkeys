/**
*
* AttendanceList
*
*/

import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';

export const attendanceIcon = {
  A: 'fa fa-square-o',
  P: 'fa fa-check-square-o',
  T: 'fa fa-minus-square-o',
};

function AttendanceList(props) {
  const {
    rowsCount,
    rowHeight,
    width,
    height,
    currentClassStudents,
    nameWidth,
    attendanceWidth,
  } = props;

  return (
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
            {typeof currentClassStudents !== 'undefined' ? currentClassStudents[columnProps.rowIndex].student.name_first : ''}
          </Cell>
        )}
        width={nameWidth}
      />
      <Column
        header={<Cell>Attendance</Cell>}
        cell={(columnProps) => (
          <Cell {...columnProps}>
            <i className={typeof currentClassStudents !== 'undefined' ? attendanceIcon[currentClassStudents[columnProps.rowIndex].attendance] : ''} />
          </Cell>
        )}
        width={attendanceWidth}
      />
    </Table>
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
};

export default AttendanceList;
