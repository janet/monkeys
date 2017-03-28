import AttendanceList from '../index';

import expect from 'expect';
import { Table, Cell } from 'fixed-data-table-2';
import { mount } from 'enzyme';
import React from 'react';

describe('<AttendanceList />', () => {
  it('should render with data', () => {
    const rowsCount = 2;
    const rowHeight = 50;
    const height = 150;
    const width = 350;
    const nameWidth = 200;
    const attendanceWidth = width - nameWidth;
    const currentClassStudents = [
      {
        student_id: 1,
        class_instance_id: 1,
        attendance: 'P',
        student: {
          id: 1,
          name_first: 'Paul',
          name_last: 'McCartney',
          rank_stripes: 2,
          rank_type: 'blue',
          program: 'gorilla',
        },
      },
      {
        student_id: 2,
        class_instance_id: 1,
        attendance: 'A',
        student: {
          id: 2,
          name_first: 'Ringo',
          name_last: 'Starr',
          rank_stripes: 0,
          rank_type: 'purple',
          program: 'leader',
        },
      },
    ];

    const renderedComponent = mount(
      <AttendanceList
        rowsCount={rowsCount}
        rowHeight={rowHeight}
        width={width}
        height={height}
        nameWidth={nameWidth}
        attendanceWidth={attendanceWidth}
        currentClassStudents={currentClassStudents}
      />
    );
    const paulNameCellText = renderedComponent.find(Cell).nodes[2].props.children;
    const absentIconComponent = <i className={'fa fa-square-o'} />;
    expect(renderedComponent.find(Table).length).toEqual(1);
    expect(renderedComponent.find(Cell).length).toEqual(6);
    expect(paulNameCellText).toEqual('Paul');
    expect(renderedComponent.contains(absentIconComponent)).toEqual(true);
  });
});
