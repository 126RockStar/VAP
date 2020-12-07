import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 This is to check the valid user/session, if it is not logged in or session expired, 
 redirect the login page
*/
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
