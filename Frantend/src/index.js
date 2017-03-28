import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


import App from './App';
import './index.css';
import Login from './Components/login';
import Registration from './Components/registration';
import Home from './Components/home';
import Profile from './Components/profile';
import Twit from './Components/twit';
import Follow from './Components/follow';
import Unfollow from './Components/unfollow';

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/home/:id" component={Home} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/twit" component={Twit} />
      <Route path="/follow/:id" component={Follow} />
      <Route path="/unfollow/:id" component={Unfollow} />
 </Router>
), document.getElementById('app'));

