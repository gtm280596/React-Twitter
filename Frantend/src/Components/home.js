import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

class home extends Component{
  constructor(props) {
    super(props);
    this.state={
      data:'',
      user_id: cookie.load('user_id')
      // user_id: ''
    }
    // this.onFieldChange = this.onFieldChange.bind(this);
    // this.handleTweet = this.handleTweet.bind(this);
  }
  componentWillMount() {
    let user_id = this.props.params.id;
    // this.setState({user_id: cookie.load('user_id')});

    axios.get(`http://localhost:8000/home/${user_id}`)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)
      this.setState({
        data: data,
      })
    });
  }
  // onfollow(id) {
  //   axios.post('http://localhost:8000/follower', {
  //     data : this.state,
  //     follower_id: id,
  //   })
  //   .then(function (response) {
  //     if(response.data.user_id) {
  //       location.reload();
  //       browserHistory.push("/home/" + response.data.user_id)
  //     }
  //   })
  //   .catch(function (error) {
  //   });
  // }

  // onfollowerCLick(e){
  //   let user_id = this.props.params.id
  //     if(user_id)
  //       browserHistory.push("/followers/" +user_id)
  //     else
  //       browserHistory.push("/login")
  //   e.preventDefault(e);
  // }

  render() {

    let user_id = this.state.user_id;
    var tweet = [];
     if(this.state.data.twits) {
      for (var i = 0; i < this.state.data.twits.length ; i++) {
        var a = this.state.data.twits[i].time;
        let t = new Date(a);
        var tweettime = t.getDate() + "/" + (t.getMonth() + 1) +"/"+ t.getFullYear() + ' ' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        if(this.state.data.twits[i].username) {
          // console.log(this.state.data.twits[i].username,"=======username")
          tweet.push(
            <div key={i} className="row">
            <div  className="form-box">
              <div  className="form-top">
                <div  className="form-left">

                  <h3>{this.state.data.twits[i].username}<a/>
                  <div className="form-right">
                  {tweettime} </div></h3><hr />
                  <div className="form-bottom">
                  {this.state.data.twits[i].tweet_text} </div>
                </div>
              </div>
              </div>
            </div>
          );

        } else {
          tweet.push(
            <div key={i} className="row">
              <div className="form-box">
                <div className="form-top">
                  <div className="form-left">
                    <div  className="form-top-right">
                    {this.state.data.twits[i].time} </div>
                    <div  id="tweet" className="form-bottom">
                    {this.state.data.twits[i].tweet_text} </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }

    var follower = [];
    if(this.state.data.follows) {
       for ( i = 0; i < this.state.data.follows.length ; i++) {
        let followerid = this.state.data.follows[i].user_id;
        let followsrc = `/follow/${followerid}`;
        if(this.state.data.follows) {
          follower.push(

            <div key={i} className="profile-sidebar">
              <div className="profile-userpic">
              <img src={require('../../public/images/image1.jpeg')}
              alt="userpic" className="img-responsive"/>&#x9;&#x9;&#x9;&#x9;&#x9;
              <a href="/userprofile/">
              {this.state.data.follows[i].username}</a>
                <div className="profile-usertitle"></div>
                <div className="profile-usertitle-name"></div>&#x9;&#x9;&#x9;&#x9;&#x9;
              </div>
              <form >
                <div className="profile-userbuttons">
                <a href={followsrc} className="btn btn-primary">
                  Follow</a>
                </div>
              </form>
            </div>
          );
        }
      }
    }

    let username = '';
    let userpic = [];
    if(this.state.data.users) {
      let loginuserimgsrc = `http://localhost:8000/images/${this.state.data.users.image}`;
      userpic.push(<img key={this.state.data.users.image.length}
        src={loginuserimgsrc} alt="userpic"
        className="img-responsive"/>);
      username = this.state.data.users.username;
    }


    let profilesrc = `/profile/${user_id}`;
    let homesrc = `/home/${user_id}`;
    return(
      <div>
        <div className="header">
          <ul className="nav nav-tabs color">
            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-home">
              <a href={homesrc}>Home</a></div>
            </li>

            <li>
              <div id="iconforlogin" className="glyphicon glyphicon-user">
              <a href={profilesrc}>Profile</a></div>
            </li>

            <li id="icon">
              <form method="get">
                <button type="submit" className="btn btn-primary">Logout</button>&nbsp &nbsp
              </form>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="row profile">
            <div className="col-sm-3">
              <div className="profile-sidebar">
                <div className="profile-userpic">
                {userpic}
                </div>

                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">&#x9;&#x9;&#x9;&#x9;&#x9;{username}</div>
                }
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active">
                      <a href="/home">
                      <i className="glyphicon glyphicon-home">
                      </i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Home</a>
                      </li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                    <li>
                      <a href={profilesrc}>
                      <i className="glyphicon glyphicon-user">
                      </i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Profile</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                    <li>
                    <a href="/twit">
                    <i className="glyphicon glyphicon-pencil">
                    </i>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;Tweet</a></li>&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6">

              {tweet}

            </div>

            <div className="col-sm-3">
              <h4>May People You Know ???
              </h4>
              {follower}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default home;

