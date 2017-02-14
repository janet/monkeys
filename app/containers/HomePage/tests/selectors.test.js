import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHomePage,
  selectStudentClassSchedule,
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

describe('selectStudentClassSchedule', () => {
  const studentClassScheduleSelector = selectStudentClassSchedule();
  it('should select the studentClassSchedule', () => {
    const studentClassSchedule = 'Youth Jiu Jitsu';
    const mockedState = fromJS({
      homePage: {
        studentClassSchedule,
      },
    });
    expect(studentClassScheduleSelector(mockedState)).toEqual(studentClassSchedule);
  });
});

describe('selectClassSchedule', () => {
  const classScheduleSelector = selectClassSchedule();
  it('should select the classSchedule', () => {
    const classSchedule = 'Youth Jiu Jitsu';
    const mockedState = fromJS({
      homePage: {
        classSchedule,
      },
    });
    expect(classScheduleSelector(mockedState)).toEqual(classSchedule);
  });
});
