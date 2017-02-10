import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take,
         call,
         put,
         fork,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getStudentClassSchedule, getStudentClassScheduleWatcher, studentClassScheduleData } from '../sagas';
import { LOAD_STUDENT_CLASS_SCHEDULE } from '../constants';
import { studentClassScheduleLoaded, studentClassScheduleLoadingError } from '../actions';

import request from 'utils/request';

describe('getStudentClassSchedule Saga', () => {
  let getStudentClassScheduleGenerator;

  beforeEach(() => {
    getStudentClassScheduleGenerator = getStudentClassSchedule();

    const requestURL = 'http://localhost:5000/student_class_schedule';
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
