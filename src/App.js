import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Paperbase/Paperbase';
import history from './services/history';
import PrivateRoute from './services/PrivateRoute';
import { validateJWT } from './services/AuthServices/authServices';

function App() {

  const [logInState, setLogIn] = useState({
    isLoggedIn: false,
    retrievedData: false,
  });

  async function checkJWT() {
    validateJWT(localStorage.getItem('token')).then(result => {
      if(result && result.data.success) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    })
  }
  useEffect(() => {
    checkJWT()
  }, [])

  function setAuth(bool) {
    setLogIn({isLoggedIn: bool, retrievedData: true});
  }

  if(logInState.retrievedData){
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" render={(props) => <SignIn {...props} setAuth={setAuth} />} />
          <Route exact path="/register" render={(props) => <SignUp {...props} setAuth={setAuth} />} />
          <PrivateRoute path="/" pathRedirect="/login" isLoggedIn={logInState.isLoggedIn} component={Home} />
        </Switch>
      </Router>
    );
  }
  else return <h4>Loading...</h4>
}
export default App;