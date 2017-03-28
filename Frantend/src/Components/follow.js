import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

class Follow extends React.Component {

  constructor(props) {
    super(props);
    this.state={

    }

  }
  componentWillMount() {
    let followuserid = this.props.params.id;

    axios.post(`http://localhost:8000/follow/${followuserid}`, {
      followerId: followuserid,
      user_id: cookie.load('user_id')
    })
    .then(res => {

    });

    window.location.href = `/home/${cookie.load('user_id')}`;
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default Follow;
