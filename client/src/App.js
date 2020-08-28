import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./navbar";
import Budget from './budget/Budget';
import PIE from './components/Pie';
import TodoForm from './components/TodoForm';





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
        <PIE />
        <Budget />
        <TodoForm />
      </div>
    </div>
  );
}

export default App;
