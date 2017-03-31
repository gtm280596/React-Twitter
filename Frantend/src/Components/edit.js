import React,{Component} from react;
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class edit extends Component {
  constructor(props) {
    super(props);
    this.state{
      userdata:'',
      eidtusername:'',
      eidtemail:'',
      eidtpassword:'',
      editfile:'',
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
  }

  editprofileapicall() {
    let coki = cookie.load('user_id');
    if(coki) {
    axios.get(`http://localhost:8000/editprofile/${coki}`)
    .then(res => {
      const userdata= res.userdata;
      console.log("-->", res.userdata)
      console.log("-->", userdata.results.username)

      this.setState({
        userdata: userdata,
        username : userdata.results.username,
        email : userdata.results.email,
        mobilenumber: userdata.results.mobilenumber,
      })

    });
  } else {
    browserHistory.push('/');
  }
  }

  onChange(e){
      this.setState({ [e.target.name]: e.target.value})
  }
   onSubmit(e){
    axios.post(`http://localhost:8000/edit/${cookie.load('user_id')}`, {
      userdata: this.state,
      user_id: cookie.load('user_id')
    })
    .then( (response) => {
      console.log('Response------>>',response);
      // return false;
      browserHistory.push(`/home/${cookie.load('user_id')}`)
      })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() {
    return(
      <div>
        <div className="container">
          <h1>Edit Profile</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="text-center">
                <form  className="form-horizontal">
                  <div className="form-group" >
                    <div className="profile-userpic"><img src="images/" className="image-responsive"/>
                      <h6>Upload a different photo...</h6>
                      <input type="file" name="file" required="required" className="form-control"/>
                      <button type="submit" className="btn btn-primary">Upload</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-9 personal-info">
              <h3>Personal info
                <form action="/edit" method="post" className="form-horizontal">
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Email:</label>
                    <div className="col-lg-8">
                      <input type="email" name="editemail" value="value" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-3 control-label">Username:</label>
                    <div className="col-md-8">
                      <input type="text" name="editusername" value="value" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-3 control-label">Password:</label>
                    <div className="col-md-8">
                      <input type="password" name="editpassword" value="value" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-3 control-label"></label>
                    <div className="col-md-8">
                      <button type="submit" className="btn btn-primary">Save</button>&nbsp &nbsp
                      <button type="reset" className="btn btn-primary">Cancel</button>
                    </div>
                  </div>
                </form>
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default edit;
