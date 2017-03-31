import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';


class login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
    this.onLogin =this.onLogin.bind(this);
    this.onLogout =this.onLogout.bind(this);
  }
  componentWillMount() {
    this.state =  { user_id: cookie.load('user_id') };
  }

  onLogin(user_id) {
    this.setState({ user_id });
    cookie.save('user_id', user_id, { path: '/' });
  }

  onLogout() {
    cookie.remove('user_id', { path: '/' });
  }

  onChange(e){
      this.setState({ [e.target.name]: e.target.value})
  }
   onSubmit(e){
    axios.post('http://localhost:8000/login', {
      userdata: this.state,
    })
    .then(function (response) {
      console.log(response);
      // alert(response);
      // return false;
      if (response.data.id) {
        cookie.save('user_id', response.data.id);
        browserHistory.push("/home/" + response.data.id)
      } else {
        browserHistory.push("/login")
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    e.preventDefault();
  }
  render() {
    const style = {
    fontWeight: '900',
    textDecoration:'None',
    };
    return(
      <div>
        <div className="container">
          <div className="menu">
            <ul className="nav nav-tabs">
              <li>
                <div id="iconforlogin" className="glyphicon glyphicon-user">
                </div>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 form-box">
              <div className="form-top">
                <div className="form-top-left">
                  <h3>Login Community</h3>
                </div>
                <div className="form-top-right">
                <i className="fa fa-key fa-4x"></i></div>
              </div>

              <div className="form-bottom">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="form-username" className="sr-only">Email</label>
                    <input value={this.state.username}
                    onChange={this.onChange}
                    type="text"
                    name="email"
                    placeholder="Email..." required className="form-control"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-password" className="sr-only">Password</label>
                    <input value={this.state.username}
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    placeholder="Password..."
                    required
                    className="form-password form-control"/>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn">Login</button>
                    <input type="checkbox" checked="checked" name="Remember_me" value="Remember_me" required/>
                    <label>Remember me</label>
                  </div>
                  <div className="form-group">
                    <label><h2>New user</h2></label><br/><a href="/registration" className="btn"> Sign Up Now..??</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default login;
