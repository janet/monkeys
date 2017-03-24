import { createSelector } from 'reselect';

const selectAttendance = () => (state) => state.get('attendance');

const selectStudents = () => createSelector(
  selectAttendance(),
  (attendanceState) => attendanceState.get('students')
);

const selectClassInstance = () => createSelector(
  selectAttendance(),
  (attendanceState) => attendanceState.get('classInstance')
);

const selectCurrentClass = () => createSelector(
  selectAttendance(),
  (attendanceState) => attendanceState.get('currentClass')
);

export {
  selectAttendance,
  selectStudents,
  selectClassInstance,
  selectCurrentClass,
};
