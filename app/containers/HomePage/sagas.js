import { takeLatest } from 'redux-saga';
import { call,
         cancel,
         fork,
         put,
         take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_STUDENT_CLASS_SCHEDULE } from './constants';
import { studentClassScheduleLoaded, studentClassScheduleLoadingError } from './actions';
import request from 'utils/request';

export function* getStudentClassSchedule() {
  const requestURL = 'http://localhost:5000/student_class_schedule';

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

export default [
  studentClassScheduleData,
];
