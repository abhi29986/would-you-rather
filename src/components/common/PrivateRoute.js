import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isEmpty(authedUser) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: "/login",
            state: rest.location.pathname
          }} />
      )}
  />
);

const mapStateToProps = state => ({
  authedUser: state.authedUser
});

export default connect(mapStateToProps)(PrivateRoute);
