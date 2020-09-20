import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Utilities and Context
import setAuthToken from "./utils/setAuthToken";
import UserContext from "./utils/UserContext";
import AuthContext from "./utils/AuthContext";

// Components
import LandingPage from "./components/LandingPage";
import SupportPage from "./components/SupportPage";
import AboutPage from "./components/AboutPage";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import PrivateRoute from "./components/Routing/PrivateRoute";

function App() {
  const [userState, setUserState] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    date: "",
    token: "",
    social: {},
    todos: [],
    classes: [],
    activities: [],
    homework: [],
  });

  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    role: null,
  });

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      setAuthState({
        isAuthenticated: false,
        loading: false,
        role: null,
      });
    }

    try {
      axios.get("/api/auth").then((res) => {
        setUserState(res.data);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
      <AuthContext.Provider
        value={{ authData: authState, setAuth: setAuthState }}
      >
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <PrivateRoute path="/dash" component={Dashboard} />
              <Route path="/about" component={AboutPage} />
              <Route path="/support" component={SupportPage} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
