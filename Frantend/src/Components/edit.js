import React,{Component} from react;

class edit extends Component {
  constructor(props) {
    super(props);
    this.state{
      eidtusername:'',
      eidtemail:'',
      eidtpassword:'',
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
  }
  onChange(e){
      this.setState({ [e.target.name]: e.target.value})
  }
   onSubmit(e){
    axios.post('http://localhost:8000/edit', {
      userdata: this.state,
      user_id:this.user_id
    })
    .then(function (response) {
      console.log(response);
      alert(response);
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
    // this.setState({
    //   showComponent: true,
    // });
  }
  render() {
    return(
      <div>
        <div className="container">
          <h1>Edit Profile</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="text-center">
                <form action="/editprofile" method="post" enctype="multipart/form-data" className="form-horizontal">
                  <div className="form-group">
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
