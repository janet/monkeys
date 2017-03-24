import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         select,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_STUDENTS, LOAD_CLASS_INSTANCE } from './constants';
import { studentsLoaded, studentsLoadingError,
         classInstanceLoaded, classInstanceLoadingError } from './actions';
import { selectCurrentClass } from './selectors';
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

export const CLASS_INSTANCE_URL = 'api/class_instance';

export function* getClassInstance() {
  const currentClass = yield select(selectCurrentClass());
  const requestURL = `${CLASS_INSTANCE_URL}/${currentClass}`;

  try {
    const classInstanceResult = yield call(request, requestURL);
    yield put(classInstanceLoaded(classInstanceResult));
  } catch (err) {
    yield put(classInstanceLoadingError(err));
  }
}

export function* getClassInstanceWatcher() {
  yield fork(takeLatest, LOAD_CLASS_INSTANCE, getClassInstance);
}

export function* classInstanceData() {
  const watcher = yield fork(getClassInstanceWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  studentsData,
  classInstanceData,
];
