import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  if (!props.isLoggedIn) return <Redirect to={props.pathRedirect} />;
  else return <Route path={props.path} component={props.component} />;
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
