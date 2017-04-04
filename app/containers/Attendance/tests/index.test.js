/**
 * Test Attendance
*/

import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Map } from 'immutable';

import { Attendance, mapDispatchToProps } from '../index';
import { loadStudents, loadClassInstance, loadStudentClassInstance } from '../actions';
import { students, studentClassInstance } from './fixtures';
import AttendanceList from 'components/AttendanceList';

describe('<Attendance />', () => {
  it('should call load actions and render <div></div> without data', () => {
    const loadStudentsSpy = expect.createSpy();
    const loadClassInstanceSpy = expect.createSpy();
    const loadStudentClassInstanceSpy = expect.createSpy();

    const renderedComponent = mount(
      <Attendance
        onLoadStudents={loadStudentsSpy}
        onLoadClassInstance={loadClassInstanceSpy}
        onLoadStudentClassInstance={loadStudentClassInstanceSpy}
      />
    );

    expect(loadStudentsSpy).toHaveBeenCalled();
    expect(loadClassInstanceSpy).toHaveBeenCalled();
    expect(loadStudentClassInstanceSpy).toHaveBeenCalled();
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
      it('sholud be injected', () => {
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
  });
});

