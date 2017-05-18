import expect from 'expect';
import { fromJS } from 'immutable';
import { takeLatest } from 'redux-saga';
import { take,
         call,
         put,
         fork,
         select,
         cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getStudentClassSchedule, getStudentClassScheduleWatcher, studentClassScheduleData,
         getClassSchedule, getClassScheduleWatcher, classScheduleData,
         getStudents, getStudentsWatcher, studentsData, STUDENTS_URL,
         getClassInstance, getClassInstanceWatcher, classInstanceData, CLASS_INSTANCE_URL,
         getStudentClassInstance, getStudentClassInstanceWatcher,
         studentClassInstanceData, STUDENT_CLASS_INSTANCE_URL, updateStudentClassInstanceAttendance,
         updateStudentClassInstanceAttendanceWatcher, studentClassInstanceAttendanceData } from '../sagas';
import { LOAD_STUDENT_CLASS_SCHEDULE, LOAD_CLASS_SCHEDULE,
         LOAD_STUDENTS, LOAD_CLASS_INSTANCE,
         LOAD_STUDENT_CLASS_INSTANCE,
         CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE } from '../constants';
import { studentClassScheduleLoaded, studentClassScheduleLoadingError,
         classScheduleLoaded, classScheduleLoadingError,
         studentsLoaded, studentsLoadingError,
         classInstanceLoaded, classInstanceLoadingError,
         studentClassInstanceLoaded, studentClassInstanceLoadingError } from '../actions';
import { selectCurrentClass } from '../selectors';


import request from 'utils/request';

describe('getStudentClassSchedule Saga', () => {
  let getStudentClassScheduleGenerator;

  beforeEach(() => {
    getStudentClassScheduleGenerator = getStudentClassSchedule();

    const requestURL = 'api/student_class_schedule';
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

  it('should asynchronously fork getStudentClassScheduleWatcher saga', () => {
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

    const requestURL = 'api/class_schedule';
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

  it('should asynchronously fork getClassScheduleWatcher saga', () => {
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

const currentClass = 1;

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

  it('should asynchronously fork getStudentsWatcher saga', () => {
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

describe('getClassInstance Saga', () => {
  let getClassInstanceGenerator;

  beforeEach(() => {
    getClassInstanceGenerator = getClassInstance();

    const selectDescriptor = getClassInstanceGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectCurrentClass()));

    const requestURL = `${CLASS_INSTANCE_URL}/${currentClass}`;
    const callDescriptor = getClassInstanceGenerator.next(currentClass).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the classInstanceLoaded action if it requests the data successfully', () => {
    const response = '5/10/16';
    const putDescriptor = getClassInstanceGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(classInstanceLoaded(response)));
  });

  it('should call the classInstanceLoadingError action if the response errors', () => {
    const response = new Error('i error');
    const putDescriptor = getClassInstanceGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(classInstanceLoadingError(response)));
  });
});

describe('getClassInstanceWatcher Saga', () => {
  const getClassInstanceWatcherGenerator = getClassInstanceWatcher();

  it('should watch for the LOAD_CLASS_INSTANCE action', () => {
    const takeDescriptor = getClassInstanceWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_CLASS_INSTANCE, getClassInstance));
  });
});

describe('classInstanceData Saga', () => {
  const classInstanceDataSaga = classInstanceData();

  let forkDescriptor;

  it('should asynchronously fork getClassInstanceWatcher saga', () => {
    forkDescriptor = classInstanceDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getClassInstanceWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = classInstanceDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getClassInstanceWatcher saga',
    function* classInstanceDataSagaCancellable() {
      forkDescriptor = classInstanceDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});

describe('getStudentClassInstance Saga', () => {
  let getStudentClassInstanceGenerator;

  beforeEach(() => {
    getStudentClassInstanceGenerator = getStudentClassInstance();

    const selectDescriptor = getStudentClassInstanceGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectCurrentClass()));

    const requestURL = `${STUDENT_CLASS_INSTANCE_URL}/${currentClass}`;
    const callDescriptor = getStudentClassInstanceGenerator.next(currentClass).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the studentClassInstanceLoaded action if it requests the data successfully', () => {
    const response = [
      fromJS({
        student_id: 1,
        class_instance_id: 1,
      }),
      fromJS({
        student_id: 2,
        class_instance_id: 1,
      }),
    ];
    const putDescriptor = getStudentClassInstanceGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(studentClassInstanceLoaded(response)));
  });

  it('should call the studentClassInstanceLoadingError action if the response errors', () => {
    const response = new Error('Some Error');
    const putDescriptor = getStudentClassInstanceGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(studentClassInstanceLoadingError(response)));
  });
});

describe('getStudentClassInstanceWatcher Saga', () => {
  const getStudentClassInstanceWatcherGenerator = getStudentClassInstanceWatcher();

  it('should watch for the LOAD_STUDENT_CLASS_INSTANCE action', () => {
    const takeDescriptor = getStudentClassInstanceWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_STUDENT_CLASS_INSTANCE, getStudentClassInstance));
  });
});


describe('studentClassInstanceData Saga', () => {
  const studentClassInstanceDataSaga = studentClassInstanceData();

  let forkDescriptor;

  it('should asynchronously fork the getStudentClassInstanceWatcher saga', () => {
    forkDescriptor = studentClassInstanceDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getStudentClassInstanceWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = studentClassInstanceDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel the forked getStudentClassInstanceWatcher saga',
    function* studentClassInstanceDataSagaCancellable() {
      forkDescriptor = studentClassInstanceDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});

describe('updateStudentClassInstanceAttendance Saga', () => {
  let updateStudentClassInstanceAttendanceGenerator;

  it('should return the studentClassInstance if it requests the attendance update successfully', () => {
    const action = {
      type: CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE,
      studentClassInstanceId: 1,
      attendance: 'P',
    };
    updateStudentClassInstanceAttendanceGenerator = updateStudentClassInstanceAttendance(action);

    const id = action.studentClassInstanceId;
    const attendance = action.attendance;
    const requestURL = `${STUDENT_CLASS_INSTANCE_URL}/${id}/${attendance}`;
    const callDescriptor = updateStudentClassInstanceAttendanceGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });
});

describe('updateStudentClassInstanceAttendanceWatcher Saga', () => {
  const updateStudentClassInstanceAttendanceWatcherGenerator = updateStudentClassInstanceAttendanceWatcher();

  it('should watch for the CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE action', () => {
    const takeDescriptor = updateStudentClassInstanceAttendanceWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, CHANGE_STUDENT_CLASS_INSTANCE_ATTENDANCE, updateStudentClassInstanceAttendance));
  });
});

describe('studentClassInstanceAttendanceData Saga', () => {
  const studentClassInstanceAttendanceDataSaga = studentClassInstanceAttendanceData();

  let forkDescriptor;

  it('should asynchronously fork updateStudentClassInstanceAttendanceWatcher saga', () => {
    forkDescriptor = studentClassInstanceAttendanceDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(updateStudentClassInstanceAttendanceWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = studentClassInstanceAttendanceDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked updateStudentClassInstanceAttendanceWatcher saga',
    function* studentClassInstanceAttendanceDataSagaCancellable() {
      forkDescriptor = studentClassInstanceAttendanceDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
