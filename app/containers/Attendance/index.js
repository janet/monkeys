/*
 *
 * Attendance
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectAttendance,
         selectStudents } from './selectors';
import { loadStudents } from './actions';

export class Attendance extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onLoadStudents();
  }

  render() {
    console.log(this.props.students);
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
  onLoadStudents: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  attendance: selectAttendance(),
  students: selectStudents(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadStudents: () => dispatch(loadStudents()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
