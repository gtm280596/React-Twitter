import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
class registration extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password : '',
      file : '',
      imagePreviewUrl: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
  axios.post('http://localhost:8000/registration', {
    userdata: this.state,
  })
  .then((response) =>{
    console.log(response);

    if (response.data) {
      browserHistory.push("/login/")
    } else {
        browserHistory.push("/registration")
    }
  })
  .catch( (error) => {
    console.log(error);
  });

    e.preventDefault(e);
  }

  onFieldChange(event){

    this.setState({
      [ event.target.name]: event.target.value
    });
  }

  render(){
    console.log(this.state);
    return(
      <div className="reg">
        <div className="container">
          <div className="menu">
            <ul className="nav nav-tabs">
              <li>
                <div id="iconforlogin" className="glyphicon glyphicon-user"></div>

              </li>
            </ul>
          </div>

          <div className="inner-bg">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3 form-box">
                <div className="form-top">
                  <div className="form-top-left">
                    <h3>Register to community</h3>
                  </div>
                  <div className="form-top-right"><i className="fa fa-key fa-4x"></i></div>
                </div>

                <div className="form-bottom">
                  <form encType="multipart/form-data">
                    <div className="form-group">
                      <label htmlFor="form-username" className="sr-only">Username</label>
                      <input value={this.state.username}
                      onChange={this.onFieldChange}
                      type="text" name="username"
                      placeholder="Username..."
                      required
                      className="form-control" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-Email" className="sr-only">Email</label>
                      <input value={this.state.email}
                      onChange={this.onFieldChange}
                      type="text"
                      name="email"
                      placeholder="Email..."
                      required
                      className="form-control" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-password" className="sr-only">Password</label>
                      <input value={this.state.password}
                      onChange={this.onFieldChange}
                      type="password" name="password"
                      placeholder="Password..."
                      required
                      className="form-control" />
                    </div>

                    <div className="form-group">
                      <h6>Upload a different photo...</h6>
                      <img src="images/default.jpg" alt="avatar" className="avatar img-circle"/>
                      <input value={this.state.file}
                      onChange={this.onFieldChange}
                      type="file" name="file"
                      required
                      className="form-control" />
                      <label htmlFor="form-image" className="sr-only">image</label>
                    </div>

                    <div className="form-group">
                      <button onClick={this.handleSubmit}
                      type="submit" className="btn">Sign in !</button>
                    </div>

                    <div className="form-group">
                      <label><h2>Already Account?</h2></label>
                      <br/><a href="/login">Login Now</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default registration;
