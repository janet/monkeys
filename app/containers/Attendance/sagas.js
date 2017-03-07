import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_STUDENTS } from './constants';
import { studentsLoaded, studentsLoadingError } from './actions';
import request from 'utils/request';


export const STUDENTS_URL = 'api/students';

export function* getStudents() {
  const requestURL = STUDENTS_URL;

  try {
    const studentsResult = yield call(request, requestURL);
    yield put(studentsLoaded(studentsResult));
  } catch (err) {
    yield put(studentsLoadingError(err));
  }
}

export function* getStudentsWatcher() {
  yield fork(takeLatest, LOAD_STUDENTS, getStudents);
}

export function* studentsData() {
  const watcher = yield fork(getStudentsWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  studentsData,
];
