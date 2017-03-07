import { createSelector } from 'reselect';

const selectAttendance = () => (state) => state.get('attendance');

const selectStudents = () => createSelector(
  selectAttendance(),
  (attendanceState) => attendanceState.get('students')
);

export default selectAttendance;
export {
  selectAttendance,
  selectStudents,
};
