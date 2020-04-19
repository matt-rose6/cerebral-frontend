import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Paperbase/Paperbase';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route path="/" component={Home}  isPrivate />
        {/* <Route component={SignIn} /> */}
        {/* <Route component = loggedIn? {Home}:{SignIn}>*/}
      </Switch>
    </BrowserRouter>
  );
}
export default App;