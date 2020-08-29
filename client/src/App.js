import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import Navbar from "./navbar";
// import Budget from './budget/Budget';
// import PIE from './components/Pie';
import BudgetIndex from "./Pages/budgetIndex";
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
      <Navbar />

      <div className="container my-5">
        <Router>
          <Switch>
            <Route path="/budget" component={BudgetIndex} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/todo" component={TodoList} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
