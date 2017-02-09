/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectHomePage,
         selectClassSchedule } from './selectors';
import Heading from 'components/Heading';
import { loadClassSchedule } from './actions';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onClickClassSchedule();
  }

  render() {
    console.log(this.props.classSchedule);
    return (
      <div>
        <Heading
          level={2}
          item={'Youth Jiu Jitsu'}
        />
        <Heading
          level={4}
          item={'Wed 5/20 5-6pm'}
          icon={'fa fa-calendar'}
          href={'calendar'}
        />
        <Heading
          level={4}
          item={'Jiu Jitsu Virus'}
          icon={'fa fa-play'}
          href={'playvideo'}
        />
        <Heading
          level={4}
          item={'Attendance 4'}
          icon={'fa fa-pencil'}
          href={'attendance'}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  classSchedule: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  onClickClassSchedule: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClickClassSchedule: () => dispatch(loadClassSchedule()),
  };
}

const mapStateToProps = createStructuredSelector({
  homePage: selectHomePage(),
  classSchedule: selectClassSchedule(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
