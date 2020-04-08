import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './services/history';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
//import Content from './pages/Home/Content/Content';
import Entries from './pages/Home/Entries/Entries';
import Emotions from './pages/Home/Emotions/Emotions';
import Home from './pages/Home/Paperbase/Paperbase';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/entries" render={props => <Home {...props} comp={<Entries/>} />} />
        <Route exact path="/emotions" render={props => <Home {...props} comp={<Emotions/>}/>}  />
        <Route exact path="/" component={Home}  isPrivate />
        <Route exact path="/login" exact component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route component={SignIn} />
        {/* <Route component = loggedIn? {Home}:{SignIn}>*/}
    </Switch>
    </Router>
  );
}
export default App;