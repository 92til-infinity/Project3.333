import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import BudgetPage from "./components/BudgetPage";
import CalendarPage from "./components/CalendarPage";
import TodoPage from "./components/TodoPage";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dash" component={Dashboard} />
          <Route path="/budget" component={BudgetPage} />
          <Route path="/schedule" component={CalendarPage} />
          <Route path="/todo" component={TodoPage} />
          <Route path="/chat" component={ChatPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
