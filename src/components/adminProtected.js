import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../hooks/AuthProvider";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.data?.role === 2;

  return (
    <Route
      {...rest}
      render={props =>
        isAdmin === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;