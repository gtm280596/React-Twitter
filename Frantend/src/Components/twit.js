import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

class twit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      twit:'',
      user_id: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){

    let user_id = cookie.load('user_id');
    console.log('-------', user_id);
    axios.post(`http://localhost:8000/twit`, {
      data: this.state,
      user_id: user_id,
    })
    .then( (response) => {
      browserHistory.push(`/home/${cookie.load('user_id')}`)
    })

    .catch( (error) => {
     });
    console.log(this.state);
      alert('your tweets is done: '+ this.state);
      e.preventDefault(e);

  }

  onFieldChange(event){
    console.log(event);
    this.setState({
      [ event.target.name]: event.target.value
    });
  }
  render() {
    console.log(this.state);
    return(
      <div className="twit">
        <div className="header">
          <ul className="nav nav-tabs color">
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-home">
              <a href="/home">Home</a></div>
            </li>
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-user">
              <a href="/profile">Profile</a></div>
            </li>
            <li id="icon">
              <form action="/logout" method="get">
                <button type="submit" className="btn btn-primary">Logout</button>&nbsp &nbsp
              </form>
            </li>
          </ul>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 form-box">
              <div className="form-top">
                <div className="form-top-left">
                  <h3>What's in Your mind</h3>
                </div>
                <div className="form-top-right"><i className="fa fa-pencil fa-4x"></i></div>
              </div>
              <div className="form-bottom">
                <form onSubmit={this.handleSubmit} method="POST">
                  <div className="form-group">
                    <label htmlFor="form-tweetText" className="sr-only"></label>
                    <input value={this.state.twit}
                      onChange={this.onFieldChange}
                      type="text"
                      name="twit"
                      maxLength="140"
                      placeholder="Add your tweet...!!"
                      className="form-control"/>
                  </div>

                  <div className="form-group">
                    <button type="submit"
                    value="submit"
                    className="btn">Tweet !!</button>
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
export default twit;

