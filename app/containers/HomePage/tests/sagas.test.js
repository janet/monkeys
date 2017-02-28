import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take,
         call,
         put,
         fork,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getStudentClassSchedule, getStudentClassScheduleWatcher, studentClassScheduleData,
         getClassSchedule, getClassScheduleWatcher, classScheduleData } from '../sagas';
import { LOAD_STUDENT_CLASS_SCHEDULE, LOAD_CLASS_SCHEDULE } from '../constants';
import { studentClassScheduleLoaded, studentClassScheduleLoadingError,
         classScheduleLoaded, classScheduleLoadingError } from '../actions';

import request from 'utils/request';

describe('getStudentClassSchedule Saga', () => {
  let getStudentClassScheduleGenerator;

  beforeEach(() => {
    getStudentClassScheduleGenerator = getStudentClassSchedule();

    const requestURL = 'test/url/student_class_schedule';
    const callDescriptor = getStudentClassScheduleGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the studentClassScheduleLoaded action if it requests the data successfully', () => {
    const response = 'Paul';
    const putDescriptor = getStudentClassScheduleGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(studentClassScheduleLoaded(response)));
  });

  it('should call the studentClassScheduleLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getStudentClassScheduleGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(studentClassScheduleLoadingError(response)));
  });
});

describe('getStudentClassScheduleWatcher Saga', () => {
  const getStudentClassScheduleWatcherGenerator = getStudentClassScheduleWatcher();

  it('should watch for LOAD_STUDENT_CLASS_SCHEDULE action', () => {
    const takeDescriptor = getStudentClassScheduleWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_STUDENT_CLASS_SCHEDULE, getStudentClassSchedule));
  });
});

describe('studentClassScheduleData Saga', () => {
  const studentClassScheduleDataSaga = studentClassScheduleData();

  let forkDescriptor;

  it('should asyncronously fork getStudentClassScheduleWatcher saga', () => {
    forkDescriptor = studentClassScheduleDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getStudentClassScheduleWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = studentClassScheduleDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getStudentClassScheduleWatcher saga',
    function* studentClassScheduleDataSagaCancellable() {
      forkDescriptor = studentClassScheduleDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});

describe('getClassSchedule Saga', () => {
  let getClassScheduleGenerator;

  beforeEach(() => {
    getClassScheduleGenerator = getClassSchedule();

    const requestURL = 'test/url/class_schedule';
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
