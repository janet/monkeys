import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take,
         call,
         put,
         fork,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getClassSchedule, getClassScheduleWatcher, classScheduleData } from '../sagas';
import { LOAD_CLASS_SCHEDULE } from '../constants';
import { classScheduleLoaded, classScheduleLoadingError } from '../actions';

import request from 'utils/request';

describe('getClassSchedule Saga', () => {
  let getClassScheduleGenerator;

  beforeEach(() => {
    getClassScheduleGenerator = getClassSchedule();

    const requestURL = 'http://localhost:5000/student_class_schedule';
    const callDescriptor = getClassScheduleGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the classScheduleLoaded action if it requests the data successfully', () => {
    const response = 'Paul';
    const putDescriptor = getClassScheduleGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(classScheduleLoaded(response)));
  });

  it('should call the classScheduleLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getClassScheduleGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(classScheduleLoadingError(response)));
  });
});

describe('getClassScheduleWatcher Saga', () => {
  const getClassScheduleWatcherGenerator = getClassScheduleWatcher();

  it('should watch for LOAD_CLASS_SCHEDULE action', () => {
    const takeDescriptor = getClassScheduleWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_CLASS_SCHEDULE, getClassSchedule));
  });
});

describe('classScheduleData Saga', () => {
  const classScheduleDataSaga = classScheduleData();

  let forkDescriptor;

  it('should asyncronously fork getClassScheduleWatcher saga', () => {
    forkDescriptor = classScheduleDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getClassScheduleWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = classScheduleDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getClassScheduleWatcher saga',
    function* classScheduleDataSagaCancellable() {
      forkDescriptor = classScheduleDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
