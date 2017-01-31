import { createSelector } from 'reselect';

const selectHomePage = () => (state) => state.get('homePage');

const selectClassSchedule = () => createSelector(
  selectHomePage(),
  (homePageState) => homePageState.get('classSchedule')
);

export {
  selectHomePage,
  selectClassSchedule,
};
