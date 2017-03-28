import React { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Header extends Component{
  render() {
    return(
      <div>
        <div className="header">
          <ul className="nav nav-tabs color">
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-home"><a href="/home">Home</a></div>
            </li>
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-user"><a href="/profile">Profile</a></div>
            </li>
            <li id="icon">
              <form action="/logout" method="get">
                <button type="submit" className="btn btn-primary">Logout</button>&nbsp &nbsp
              </form>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Header;
