import AdminBar from './adminbar.jsx';
import AdminPanel from './adminpanel.jsx';
import Login from './login.jsx';
import Axios from 'axios';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      report: [],
      list: [],
      page: 'Login',
      cleared: false,
      APIKey: null
    };

    this.navigate = this.navigate.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.resetEmail = this.resetEmail.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.addMember = this.addMember.bind(this);
  }

  navigate(event) {
    if (event.target.className !== this.state.page) { //dont generate a new render unless we need to.
      this.setState({
        page: event.target.className
      });
    }
  }

//******************** LOGIN ********************/

  adminLogin() {
    let credential = document.getElementById('credentials').value;
    let endpoint = document.getElementById('endpoint').value;
    Axios.post(`/api/authenticate/${endpoint}`, {credential: credential})
    .then(res => {
      if (res.data.status === 'PASSED') {
        this.setState({
          page: 'Report',
          cleared: true,
          APIKey: res.data.APIKey
        }, () => {
          this.getReport();
        });
      } else alert('do you belong here...? :-(');
    })
    .catch(err => {
      console.error(`Error authenticating: ${err}`);
    });
  }

//******************** API / REPORTING FUNCTIONS ********************/

  getReport() {
    Axios.get(`/api/report/${this.state.APIKey}`)
    .then(res => {
      this.setState({
        report: res.data
      }, () => {
        this.getMembers();
      })
    })
    .catch(err => {
      console.error(err);
    });
  }

  getMembers() {
    Axios.get(`api/members/${this.state.APIKey}`)
    .then(res => {
      this.setState({
        list: res.data
      }, () => {
        this.checkIfRSVPed();
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  checkIfRSVPed() {
    let list = this.state.list.slice(); //copy for processing
    list.forEach(member => {
      member['registered'] = false;
      this.state.report['emails'].forEach(email => {
        if (member['email'] === email) {
          member['registered'] = true;
        }
      });
    });
    // TODO: perform a re-render using setState.  Come back to this later; not important now.
    this.setState({
      list: list
    }, () => {
      // console.log(list);
      //this is for the post-MVP of showing state
    });
  }

//******************** THELIST MANAGEMENT FUNCTIONS ********************/

  addMember(form) {
    form.preventDefault();
    let newMember = {
      firstName: form.target.firstName.value,
      lastName: form.target.lastName.value,
      email: form.target.email.value
    };
    Axios.post(`/api/master/${this.state.APIKey}`, newMember)
    .then(res => {
      if (res.status === 200) {
        console.log('refresh data');
        this.getReport();
      } else console.error(`Error when attempting to add a new member: ${res.status}`);
    })
    .catch(err => console.error(`Error adding member: ${err}`));
  }

  resetEmail(event) {
    let doc = {email: event.target.id.toLowerCase()};
    Axios.patch(`/api/master/${this.state.APIKey}/reset`, doc)
    .then(res => {
      if (res.status === 200) {
        console.log(`Email reset`);
        this.getReport();
      } else if (res.status === 500) {
        console.error(`Internal server error updating email ${doc}`);
      } else if (res.status === 401) {
        console.error(`The API Code has expired.  Please login.`);
      } else console.error(`Unhandled error resetting email: ${res.status}`);
    })
    .catch(err => {
      console.error(`Error sending RSVP: ${err}`);
    });
  }

  removeEmail(event) {
    let email = event.target.id.toLowerCase();
    if(confirm(`Please confirm removal of ${email}.  This operation is not reversable and all RSVPs will remain in the database`)) {
      Axios.delete(`/api/master/${this.state.APIKey}/${email}`)
      .then((res)=> {
        if (res.status === 200) {
          console.log(`${email} removed`);
          this.getReport();
        } else if (res.status === 404) {
          console.error(`${email} was not found in the list`);
        } else if (res.status === 500)
          console.error(`${email} failed to be removed due to a server error`);
      })
      .catch(err => {
        console.error(`Error deleting RSVP: ${err}`);
      });
    }
  }

  sendEmail(event) { //TODO:
    //Process: verify if email was sent
    // -> if yes, then don't sent (it must be reset to make sure emails don't get sent more than once);
    //
    //this needs to send an API request with the data.
    //since the client has the data, should we just send it?
    let email = event.target.id;

    console.log('this feature is not yet available');

    //process:
    //1) create a new API endpoint for sending and resetting email state TODO:
    //2) send the email over API
    //3) the server will interact with OAUTH/etc.
    //4) there needs to be new router and controller code on the server side
    // For now, this section just needs to make an API call and handle errors.

  }

//******************** VIEWER ********************/

  render() {
    if (this.state.cleared === false) {
      return (<div>
        <Login login={this.adminLogin} />
      </div>)
    } else
    return (
      <div className='Admin'>
        <AdminBar
          current={this.state.page}
          navigate={this.navigate} />
        <div className='memberPanel'>
          <AdminPanel
          page={this.state.page}
          report={this.state.report}
          list={this.state.list}
          addMember={this.addMember}
          sendEmail={this.sendEmail}
          resetEmail={this.resetEmail}
          removeEmail={this.removeEmail} />
        </div>
      </div>
    );
  }
}

export default Admin;
