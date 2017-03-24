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
         selectStudentClassInstance } from './selectors';
import { loadStudents, loadClassInstance, loadStudentClassInstance } from './actions';

export class Attendance extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onLoadStudents();
    this.props.onLoadClassInstance();
    this.props.onLoadStudentClassInstance();
  }

  render() {
    console.log(this.props.students);
    console.log(this.props.classInstance);
    console.log(this.props.studentClassInstance);
    return (
      <div>
      hi sachan
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
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadStudents: () => dispatch(loadStudents()),
    onLoadClassInstance: () => dispatch(loadClassInstance()),
    onLoadStudentClassInstance: () => dispatch(loadStudentClassInstance()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
