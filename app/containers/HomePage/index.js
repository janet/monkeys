/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectHomePage,
         selectStudentClassSchedule,
         selectClassSchedule,
         selectStudents,
         selectClassInstance,
         selectStudentClassInstance,
         selectCurrentClass } from './selectors';
import { loadStudentClassSchedule,
         loadClassSchedule,
         loadStudents,
         loadClassInstance,
         loadStudentClassInstance,
         changeStudentClassInstanceAttendance } from './actions';
import Heading from 'components/Heading';
import AttendanceList from 'components/AttendanceList';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onLoadStudentClassSchedule();
    this.props.onLoadClassSchedule();
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
    let attendanceContent = null;

    console.log(this.props.studentClassSchedule);
    console.log(this.props.classSchedule);
    console.log(this.props.students);
    console.log(this.props.classInstance);
    console.log(this.props.studentClassInstance);

    const { students,
            studentClassInstance,
            onChangeStudentClassInstanceAttendance } = this.props;

    const studentsLoaded = students ? students.get('loaded') : null;
    const studentClassInstanceLoaded = studentClassInstance ? studentClassInstance.get('loaded') : null;

    let currentClassStudents;
    if (studentsLoaded === true && studentClassInstanceLoaded === true) {
      const studentsInJS = students.toJS();
      const studentClassInstanceInJS = studentClassInstance.toJS();
      currentClassStudents = this.getCurrentClassStudents(studentsInJS.data, studentClassInstanceInJS.data);
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
      attendanceContent = (<div></div>);
    } else {
      attendanceContent = (
        <AttendanceList
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          width={width}
          height={height}
          currentClassStudents={currentClassStudents}
          nameWidth={nameWidth}
          attendanceWidth={attendanceWidth}
          changeAttendance={onChangeStudentClassInstanceAttendance}
        />
      );
    }
    return (
      <div>
        <Heading
          level={2}
          item={'Youth Jiu Jitsu'}
        />
        <Heading
          level={4}
          item={'Wed 5/20 5-6pm'}
          icon={'fa fa-calendar'}
          href={'calendar'}
        />
        <Heading
          level={4}
          item={'Jiu Jitsu Virus'}
          icon={'fa fa-play'}
          href={'playvideo'}
        />
        <Heading
          level={4}
          item={'Attendance 4'}
          icon={'fa fa-pencil'}
          href={'attendance'}
        />
        <div>
          {attendanceContent}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  studentClassSchedule: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  classSchedule: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  onLoadStudentClassSchedule: React.PropTypes.func,
  onLoadClassSchedule: React.PropTypes.func,
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
  onChangeStudentClassInstanceAttendance: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadStudentClassSchedule: () => dispatch(loadStudentClassSchedule()),
    onLoadClassSchedule: () => dispatch(loadClassSchedule()),
    onLoadStudents: () => dispatch(loadStudents()),
    onLoadClassInstance: () => dispatch(loadClassInstance()),
    onLoadStudentClassInstance: () => dispatch(loadStudentClassInstance()),
    onChangeStudentClassInstanceAttendance: (id, attendance) => dispatch(changeStudentClassInstanceAttendance(id, attendance)),
  };
}

const mapStateToProps = createStructuredSelector({
  homePage: selectHomePage(),
  studentClassSchedule: selectStudentClassSchedule(),
  classSchedule: selectClassSchedule(),
  students: selectStudents(),
  classInstance: selectClassInstance(),
  studentClassInstance: selectStudentClassInstance(),
  currentClass: selectCurrentClass(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
