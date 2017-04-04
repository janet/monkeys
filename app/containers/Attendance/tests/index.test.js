/**
 * Test Attendance
*/

import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Map } from 'immutable';

import { Attendance, mapDispatchToProps } from '../index';
import { loadStudents, loadClassInstance, loadStudentClassInstance, changeStudentClassInstanceAttendance } from '../actions';
import { students, studentClassInstance } from './fixtures';
import AttendanceList from 'components/AttendanceList';

describe('<Attendance />', () => {
  it('should call load actions and render <div></div> without data', () => {
    const loadStudentsSpy = expect.createSpy();
    const loadClassInstanceSpy = expect.createSpy();
    const loadStudentClassInstanceSpy = expect.createSpy();
    const changeStudentClassInstanceAttendanceSpy = expect.createSpy();

    const renderedComponent = mount(
      <Attendance
        onLoadStudents={loadStudentsSpy}
        onLoadClassInstance={loadClassInstanceSpy}
        onLoadStudentClassInstance={loadStudentClassInstanceSpy}
        changeStudentClassInstanceAttendance={changeStudentClassInstanceAttendanceSpy}
      />
    );

    expect(loadStudentsSpy).toHaveBeenCalled();
    expect(loadClassInstanceSpy).toHaveBeenCalled();
    expect(loadStudentClassInstanceSpy).toHaveBeenCalled();
    expect(changeStudentClassInstanceAttendanceSpy).toNotHaveBeenCalled();
    expect(renderedComponent.contains(<div></div>)).toEqual(true);
  });

  it('should render AttendanceList with data', () => {
    const studentsState = Map({ // eslint-disable-line new-cap
      loaded: true,
      data: students,
    });
    const studentClassInstanceState = Map({ // eslint-disable-line new-cap
      loaded: true,
      data: studentClassInstance,
    });
    const renderedComponent = mount(
      <Attendance
        onLoadStudents={() => {}}
        onLoadClassInstance={() => {}}
        onLoadStudentClassInstance={() => {}}
        onChangeStudentClassInstanceAttendance={() => {}}
        students={studentsState}
        studentClassInstance={studentClassInstanceState}
        classInstance={{}}
      />
    );
    expect(renderedComponent.find(AttendanceList)).toExist();
  });

  describe('mapDispatchToProps', () => {
    describe('onLoadStudents', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoadStudents).toExist();
      });

      it('should dispatch loadStudents when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        result.onLoadStudents();
        expect(dispatch).toHaveBeenCalledWith(loadStudents());
      });
    });
    describe('onLoadClassInstance', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoadClassInstance).toExist();
      });

      it('should dispatch loadClassInstance when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        result.onLoadClassInstance();
        expect(dispatch).toHaveBeenCalledWith(loadClassInstance());
      });
    });
    describe('onLoadStudentClassInstance', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoadStudentClassInstance).toExist();
      });

      it('should dispatch loadStudentClassInstance when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        result.onLoadStudentClassInstance();
        expect(dispatch).toHaveBeenCalledWith(loadStudentClassInstance());
      });
    });
    describe('onChangeStudentClassInstanceAttendance', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeStudentClassInstanceAttendance).toExist();
      });
      it('should dispatch changeStudentClassInstanceAttendance when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        const id = 1;
        const attendance = 'P';
        result.onChangeStudentClassInstanceAttendance(id, attendance);
        expect(dispatch).toHaveBeenCalledWith(changeStudentClassInstanceAttendance(id, attendance));
      });
    });
  });
});

