import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

class profile extends Component{
  constructor(props) {
    super(props);
    this.state={
      data:'',
      user_id: cookie.load('user_id')
  }
}
  componentWillMount() {
    let user_id = cookie.load('user_id')
    axios.get(`http://localhost:8000/profile/${user_id}`)
    .then(res => {
      const data= res.data;
      console.log('response data ---> ', data);
      this.setState({
      data: data,
      user_id: cookie.load('user_id')
      })
    });
  }
  render() {

    let user_id = this.state.user_id;

    let profilesrc = `/profile/${user_id}`;
    let homesrc = `/home/${user_id}`;
    let userpic = [];
    if(this.state.data.users) {
      let userpicsrc = `http://localhost:8000/images/${this.state.data.users[0].image}`;
      userpic.push(<img src={userpicsrc} alt="profile" height="150px" width="150px"/>);
    }

    var tweet = [];
      if(this.state.data.twits) {
      for (var i = 0; i < this.state.data.twits.length ; i++) {
        var a = this.state.data.twits[i].time;
        let t = new Date(a);
        var tweettime = t.getDate() + "/" + (t.getMonth() + 1) +"/"+ t.getFullYear() + ' ' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        if(this.state.data.twits[i].username) {
          console.log(this.state.data.twits[i].username,"=======twits")
          tweet.push(
            <div key={i} className="row">
              <div  className="form-box">
                <div  className="form-top">
                  <div  className="form-left">
                    <h3>{this.state.data.twits[i].username}
                    <div   className="form-right">
                    {tweettime} </div></h3><hr />
                    <div id="tweet" className="form-bottom">
                    {this.state.data.twits[i].tweet_text} </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    var followes = [];
    if(this.state.data.follows) {
       for ( i = 0; i < this.state.data.follows.length ; i++) {
        let followerimgsrc = `http://localhost:8000/images/${this.state.data.follows[i].image}`;
        let followerid = this.state.data.follows[i].user_id;
        let unfollowsrc = `/unfollow/${followerid}`;
        if(this.state.data.follows) {

          followes.push(
          <div key={i} className="clearfix">
          <div className="profile-sidebar">
            <div className="profile-userpic">
            <img src={followerimgsrc}  alt='avtar'/></div>

            <div className="profile-usertitle">
              <div className="profile-usertitle-name">
              {this.state.data.follows[i].username}</div>&#x9;&#x9;&#x9;&#x9;&#x9;
            </div>
          </div>
             <a href={unfollowsrc} className="btn btn-primary">
                  UnFollow</a>
          </div>
          );
        }
      }
    }
    let user = '';
    if(this.state.data.users) {
      user = this.state.data.users;
    }
    console.log("useruser:", user);
    console.log("=---->",this.state.data.users);
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header id="header">
                <div className="slider">
                  <div id="carousel-example-generic" data-ride="carousel" className="carousel slide">
                    <div role="listbox" className="carousel-inner">
                      <div className="item active">
                      {userpic}</div>
                    </div>
                  </div>
                </div>

                <nav className="navbar navbar-default">
                  <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target="#mainNav" className="navbar-toggle collapsed">
                    <span className="sr-only">Toggle navigation</span>
                    </button>

                    <a href="#" className="navbar-brand">
                    {userpic}
                    </a>
                    <span className="site-name">user</span>
                  </div>
                  <div id="mainNav" className="collapse navbar-collapse">
                    <ul className="nav main-menu navbar-nav">
                      <li>
                      <a href={homesrc}>
                      <i className="fa fa-home">
                      </i> HOME</a></li>
                      <li>
                      <a href="#">
                      <i className="fa fa-user">
                      </i> Edit</a></li>
                      <li>
                      <a href="/logout">
                      <i className="fa fa-sign-out">
                      </i> Logout</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li>
                      <a href="#">
                      <i className="fa fa-facebook">
                      </i></a></li>
                      <li>
                      <a href="#">
                      <i className="fa fa-twitter">
                      </i></a></li>
                      <li>
                      <a href="#">
                      <i className="fa fa-google-plus">
                      </i></a></li>
                    </ul>
                  </div>
                </nav>
              </header>
            </div>

            <div className="col-sm-3">
              <div className="profile-sidebar">
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active"><a href={homesrc}><i className="glyphicon glyphicon-home"></i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Home</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                    <li>
                    <a href="/edit">
                    <i className="glyphicon glyphicon-user"></i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Edit Profile</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                    <li>
                    <a href="/twit">
                    <i className="glyphicon glyphicon-pencil"></i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Tweet</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                    <li>
                    <a href="/logout">
                    <i className="glyphicon glyphicon-log-out"></i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Logout</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              {tweet}
            </div>

            <div className="col-sm-3">
              <h4/>Follower.
                {followes}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default profile;

