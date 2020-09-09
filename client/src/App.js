import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import Budget from './budget/Budget';
// import PIE from './components/Pie';
import LandingPage from './components/LandingPage';
import BudgetIndex from './Pages/budgetIndex';
import Schedule from './Pages/Schedule';
import TodoList from './components/Todo/TodoList';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dash' component={Dashboard} />
          <Route path='/budget' component={BudgetIndex} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/todo' component={TodoList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
