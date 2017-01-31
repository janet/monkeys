import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHomePage,
  selectClassSchedule,
} from '../selectors';

describe('selectHomePage', () => {
  const homePageSelector = selectHomePage();
  it('should select the homePage state', () => {
    const homePageState = fromJS({
      homePage: {},
    });
    const mockedState = fromJS({
      homePage: homePageState,
    });
    expect(homePageSelector(mockedState)).toEqual(homePageState);
  });
});

describe('selectClassSchedule', () => {
  const classScheduleSelector = selectClassSchedule();
  it('should select the classSchedule', () => {
    const classSchedule = 'Paul';
    const mockedState = fromJS({
      homePage: {
        classSchedule,
      },
    });
    expect(classScheduleSelector(mockedState)).toEqual(classSchedule);
  });
});
