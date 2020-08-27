import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./navbar";
// import Budget from './budget/Budget';
// import PIE from './components/Pie';
import BudgetIndex from "./Pages/budgetIndex"





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
        <BudgetIndex />
      </div>
    </div>
  );
}

export default App;
