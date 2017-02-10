import { createSelector } from 'reselect';

const selectHomePage = () => (state) => state.get('homePage');

const selectStudentClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('studentClassSchedule')
);

export {
  selectHomePage,
  selectStudentClassSchedule,
};
