import { createSelector } from 'reselect';

// HomePage
const selectHomePage = () => (state) => state.get('homePage');

const selectStudentClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('studentClassSchedule')
);

const selectClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('classSchedule')
);

// Attendance
const selectStudents = () => createSelector(
  selectHomePage(),
  (attendanceState) => attendanceState.get('students')
);

const selectClassInstance = () => createSelector(
  selectHomePage(),
  (attendanceState) => attendanceState.get('classInstance')
);

const selectCurrentClass = () => createSelector(
  selectHomePage(),
  (attendanceState) => attendanceState.get('currentClass')
);

const selectStudentClassInstance = () => createSelector(
  selectHomePage(),
  (attendanceState) => attendanceState.get('studentClassInstance')
);

export {
  selectHomePage,
  selectStudentClassSchedule,
  selectClassSchedule,
  selectStudents,
  selectClassInstance,
  selectCurrentClass,
  selectStudentClassInstance,
};
