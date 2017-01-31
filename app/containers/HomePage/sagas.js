import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_CLASS_SCHEDULE } from './constants';
import { classScheduleLoaded, classScheduleLoadingError } from './actions';
import request from 'utils/request';

export function* getClassSchedule() {
  const requestURL = 'http://localhost:5000/student_class_schedule';

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
  classScheduleData,
];
