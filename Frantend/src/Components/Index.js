import React, { Component } from 'react';

class Index extends Component{
  render() {
    return(
      <div>
        <div className="menu">
          <ul className="nav nav-tabs">
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-heart"></div>
            </li>
          </ul>
          <div className="inner cover">
            <h1 className="cover-heading">Twitter-clone</h1>
            <p className="lead">No matter your position, proper twitter clone  makes your conversation easier.</p>
            <button className="btn-primary"><a id="login" href="/registration">SignUp</a></button>&nbsp &nbsp
            <button className="btn-primary"><a id="login" href="/login">LogIn</a></button>
          </div>
        </div>
      </div>
    )
  }
}
export default Index;
