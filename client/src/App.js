import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import HomePage from "./components/homepage.component";
import PrivateRoute from './components/private.route.component';

import { GetRequest, accountAuth } from '././tools/utils.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(accountAuth.isAuthenticated);

  React.useEffect(() => {
    GetRequest("/api/user/state", function (response) {
      if (typeof response == 'object' && response.hasOwnProperty('status')) {

        response.status ? accountAuth.authenticate(() => setIsAuthenticated(true)) : accountAuth.signOut(() => setIsAuthenticated(false));
      }
    });
  }, []);

  return (
    <Router>
      {
        accountAuth.isAuthenticated 
        ? 
        <Redirect to={'/'} /> : <Redirect to={'/sign-in'} />
      }
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={accountAuth.isAuthenticated ? "/home" : "/sign-in"}>Satoshi App</Link>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              {/* <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} /> */}

              <PrivateRoute exact path='/'>
                <HomePage />
              </PrivateRoute>
              <Route path="/sign-in">
                <Login />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <PrivateRoute path='/home'>
                <HomePage />
              </PrivateRoute>

            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
