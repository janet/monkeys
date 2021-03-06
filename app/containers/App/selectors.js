import { createSelector } from 'reselect';

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectApp = () => (state) => state.get('app');

const selectLoggedIn = () => createSelector(
  selectApp(),
  (authorizeState) => authorizeState.get('loggedIn')
);

export {
  selectLocationState,
  selectApp,
  selectLoggedIn,
};
