import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './services/history';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Paperbase';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/home" component={Home} isPrivate />
        <Route component={SignIn} />
    </Switch>
    </Router>
  );
}
export default App;