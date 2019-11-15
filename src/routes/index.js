import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn.js';
import SignUp from '../pages/SignUp.js';
import Home from '../pages/Home/Paperbase.js';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/home" component={Home} isPrivate />
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={SignIn} />
    </Switch>
  );
}