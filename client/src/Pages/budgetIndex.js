import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Budget from "../budget/Budget";
import Navbar from "../components/Navbar";
// import PIE from '../components/Pie';
import { BudgetProvider } from "../store";
// import ExpenseChart from '../components/Chart';

function BudgetIndex() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      <Navbar />
      <BudgetProvider>
        <div className="container my-5">
          {/* <ExpenseChart /> */}
          <Budget />
        </div>
      </BudgetProvider>
    </div>
  );
}

export default BudgetIndex;
