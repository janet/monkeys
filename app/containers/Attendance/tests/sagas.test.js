import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take,
         call,
         put,
         fork,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getStudents, getStudentsWatcher, studentsData, STUDENTS_URL } from '../sagas';
import { LOAD_STUDENTS } from '../constants';
import { studentsLoaded, studentsLoadingError } from '../actions';

import request from 'utils/request';

describe('getStudents Saga', () => {
  let getStudentsGenerator;

  beforeEach(() => {
    getStudentsGenerator = getStudents();

    const requestURL = STUDENTS_URL;
    const callDescriptor = getStudentsGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the studentsLoaded action if it requests the data successfully', () => {
    const response = 'Paul';
    const putDescriptor = getStudentsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(studentsLoaded(response)));
  });

  it('should call the studentsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getStudentsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(studentsLoadingError(response)));
  });
});

describe('getStudentsWatcher Saga', () => {
  const getStudentsWatcherGenerator = getStudentsWatcher();

  it('should watch for the LOAD_STUDENTS action', () => {
    const takeDescriptor = getStudentsWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_STUDENTS, getStudents));
  });
});

describe('studentsData Saga', () => {
  const studentsDataSaga = studentsData();

  let forkDescriptor;

  it('should asyncronously fork getStudentsWatcher saga', () => {
    forkDescriptor = studentsDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getStudentsWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = studentsDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getStudentsWatcher saga',
    function* studentsDataSagaCancellable() {
      forkDescriptor = studentsDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
