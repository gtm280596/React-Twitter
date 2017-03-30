import React, {Component} from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class logout extends Component {
  render() {
    var log = cookie.load('user_id');
    if(log > 0 ) {
      cookie.remove('user_id', { path: '/' });
      browserHistory.push('/');
    } else {
      browserHistory.push('/');
    }
    return (
      <div></div>
    );
  }
}

 export default logout;
