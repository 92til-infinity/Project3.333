import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Utilities and Context
import setAuthToken from './utils/setAuthToken';
import UserContext from './utils/UserContext';

// Components
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import BudgetPage from './components/BudgetPage';
import CalendarPage from './components/CalendarPage';
import TodoPage from './components/TodoPage';
import ChatPage from './components/ChatPage';
// import Login from "./components/Login";
// import SignUpPage from './components/SignUp';
import SignUpModal from './components/SignUpModal';

function App() {
  const [userState, setUserState] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    classes: [],
    activities: [],
    homework: [],
  });

  useEffect(() => {
    console.log('Using effect...');
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      axios.get('/api/auth').then((res) => {
        setUserState(res);
      });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);

  return (
    <UserContext.Provider value={userState}>
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path='/signup' component={SignUpModal} />
            <Route path='/dash' component={Dashboard} />
            <Route path='/budget' component={BudgetPage} />
            <Route path='/schedule' component={CalendarPage} />
            <Route path='/todo' component={TodoPage} />
            <Route path='/chat' component={ChatPage} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
