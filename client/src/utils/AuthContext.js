import React from "react";

const AuthContext = React.createContext({
  authData: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    role: null,
  },
  setAuth: () => {},
});

export default AuthContext;
