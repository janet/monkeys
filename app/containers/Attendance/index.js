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
         selectClassInstance } from './selectors';
import { loadStudents, loadClassInstance } from './actions';

export class Attendance extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onLoadStudents();
    this.props.onLoadClassInstance();
  }

  render() {
    console.log(this.props.students);
    console.log(this.props.classInstance);
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
  onLoadStudents: React.PropTypes.func,
  onLoadClassInstance: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  attendance: selectAttendance(),
  students: selectStudents(),
  classInstance: selectClassInstance(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadStudents: () => dispatch(loadStudents()),
    onLoadClassInstance: () => dispatch(loadClassInstance()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
