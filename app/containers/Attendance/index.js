/*
 *
 * Attendance
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectAttendance,
         selectStudents,
         selectClassInstance,
         selectStudentClassInstance,
         selectCurrentClass } from './selectors';
import { loadStudents, loadClassInstance, loadStudentClassInstance } from './actions';
import AttendanceList from 'components/AttendanceList';


export class Attendance extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onLoadStudents();
    this.props.onLoadClassInstance();
    this.props.onLoadStudentClassInstance();
  }

  getCurrentClassStudents(students, studentClassInstance) {
    const currentClassStudents = studentClassInstance.map((sci) => {
      const newObj = {
        ...sci,
        student: students.filter((student) => sci.student_id === student.id)[0],
      };
      return newObj;
    });
    return currentClassStudents;
  }

  render() {
    let mainContent = null;

    console.log(this.props.classInstance);
    const { students,
            studentClassInstance } = this.props;

    const studentsLoaded = students ? students.get('loaded') : null;
    const studentClassInstanceLoaded = studentClassInstance ? studentClassInstance.get('loaded') : null;

    let currentClassStudents;
    if (studentsLoaded === true && studentClassInstanceLoaded === true) {
      currentClassStudents = this.getCurrentClassStudents(students.get('data'), studentClassInstance.get('data'));
    }

    // Table dimensions
    const rowHeight = 50;
    const rowsCount = currentClassStudents ? currentClassStudents.length : 0;
    // height is the number of rows plus the header multiplied by the row height plus a 2 pixel border
    const height = currentClassStudents ? ((currentClassStudents.length + 1) * rowHeight) + 2 : 0;
    const width = 350;
    const nameWidth = 200;
    const attendanceWidth = width - nameWidth;

    if (!currentClassStudents) {
      mainContent = (<div></div>);
    } else {
      mainContent = (
        <AttendanceList
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          width={width}
          height={height}
          currentClassStudents={currentClassStudents}
          nameWidth={nameWidth}
          attendanceWidth={attendanceWidth}
        />
      );
    }

    return (
      <div>
        {mainContent}
      </div>
    );
  }
}

Attendance.propTypes = {
  students: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  classInstance: React.PropTypes.object,
  studentClassInstance: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  onLoadStudents: React.PropTypes.func,
  onLoadClassInstance: React.PropTypes.func,
  onLoadStudentClassInstance: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  attendance: selectAttendance(),
  students: selectStudents(),
  classInstance: selectClassInstance(),
  studentClassInstance: selectStudentClassInstance(),
  currentClass: selectCurrentClass(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadStudents: () => dispatch(loadStudents()),
    onLoadClassInstance: () => dispatch(loadClassInstance()),
    onLoadStudentClassInstance: () => dispatch(loadStudentClassInstance()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
