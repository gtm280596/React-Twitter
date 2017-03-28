import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

class twit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tweetText:'',
      user_id:cookie.load('user_id'),
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    console.log(this.state);
    axios.post(`http://localhost:8000/twit`, {
      userdata: this.state,
    })

    .then( (response) => {
      console.log(response,"hasghio");
      location.reload();
      browserHistory.push("/home/" + response)
    })
    .catch(function (error) {
    });
    alert('your tweets is done: '+ this.state);
    e.preventDefault(e);
  }

  onFieldChange(event){
    console.log(event);
    this.setState({
      [ event.target.name]: event.target.value
    });
  }
  componentWillMount() {
    let user_id = this.props.params.id;
    axios.get(`http://localhost:8000/twit/${cookie.load(user_id)}`)
    .then(res => {
      const data= res.data;
      this.setState({
        tweetText:'',
        user_id:'',
        // user_id: cookie.load('user_id')
      })
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
                      name="tweetText"
                      maxLength="140"
                      placeholder="Add your tweet...!!"
                      className="form-control"/>
                  </div>

                  <div className="form-group">
                    <button type="submit"
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

