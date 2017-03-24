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

import { getStudents, getStudentsWatcher, studentsData, STUDENTS_URL,
         getClassInstance, getClassInstanceWatcher, classInstanceData, CLASS_INSTANCE_URL,
         getStudentClassInstance, getStudentClassInstanceWatcher,
         studentClassInstanceData, STUDENT_CLASS_INSTANCE_URL } from '../sagas';
import { LOAD_STUDENTS, LOAD_CLASS_INSTANCE, LOAD_STUDENT_CLASS_INSTANCE } from '../constants';
import { studentsLoaded, studentsLoadingError,
         classInstanceLoaded, classInstanceLoadingError,
         studentClassInstanceLoaded, studentClassInstanceLoadingError } from '../actions';
import { selectCurrentClass } from '../selectors';

import request from 'utils/request';


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

  it('should asyncronously fork getClassInstanceWatcher saga', () => {
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

  it('should asyncronously fork the getStudentClassInstanceWatcher saga', () => {
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
