import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
// import Budget from './budget/Budget';
// import PIE from './components/Pie';
import LandingPage from "./components/LandingPage";
import BudgetIndex from "./Pages/BudgetIndex";
import Schedule from "./Pages/Schedule";
import TodoList from "./components/Todo/TodoList";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}

      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/budget" component={BudgetIndex} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/todo" component={TodoList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
