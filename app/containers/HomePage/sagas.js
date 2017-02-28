import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_CLASS_SCHEDULE, LOAD_STUDENT_CLASS_SCHEDULE } from './constants';
import { classScheduleLoaded, classScheduleLoadingError,
         studentClassScheduleLoaded, studentClassScheduleLoadingError } from './actions';
import request from 'utils/request';

// set test url for tests to pass because Karma doesn't read process.env variables
const apiUrl = typeof process.env.API_URL !== 'undefined' ? process.env.API_URL : 'test/url';

export function* getStudentClassSchedule() {
  const requestURL = `${apiUrl}/student_class_schedule`;

  try {
    const studentClassScheduleResult = yield call(request, requestURL);
    yield put(studentClassScheduleLoaded(studentClassScheduleResult));
  } catch (err) {
    yield put(studentClassScheduleLoadingError(err));
  }
}

export function* getStudentClassScheduleWatcher() {
  yield fork(takeLatest, LOAD_STUDENT_CLASS_SCHEDULE, getStudentClassSchedule);
}

export function* studentClassScheduleData() {
  const watcher = yield fork(getStudentClassScheduleWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getClassSchedule() {
  const requestURL = `${apiUrl}/class_schedule`;

  try {
    const classScheduleResult = yield call(request, requestURL);
    yield put(classScheduleLoaded(classScheduleResult));
  } catch (err) {
    yield put(classScheduleLoadingError(err));
  }
}

export function* getClassScheduleWatcher() {
  yield fork(takeLatest, LOAD_CLASS_SCHEDULE, getClassSchedule);
}

export function* classScheduleData() {
  const watcher = yield fork(getClassScheduleWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export default [
  studentClassScheduleData,
  classScheduleData,
];
