import React from "react";
import { Route, Redirect, Router } from "react-router-dom";

export default function PrivateRoute({ authenticated, ...props }) {
  return authenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/admin-login",
        redirecturl: props.path,
      }}
    />
  );
}
