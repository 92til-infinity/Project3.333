import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authData } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !authData.isAuthenticated && !authData.loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
