import { createSelector } from 'reselect';

const selectHomePage = () => (state) => state.get('homePage');

const selectStudentClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('studentClassSchedule')
);

const selectClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('classSchedule')
);

export {
  selectHomePage,
  selectStudentClassSchedule,
  selectClassSchedule,
};
