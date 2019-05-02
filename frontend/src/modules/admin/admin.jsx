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
    this.emailAll = this.emailAll.bind(this);
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
    Axios.post(`/api/login/${endpoint}`, {credential: credential})
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
    Axios.get(`api/members/retrieve/${this.state.APIKey}`)
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
    let list = this.state.list.slice();
    let registeredCount = 0;
    list.forEach(member => {
      member['registered'] = false;
      this.state.report['emails'].forEach(email => {
        if (member['email'] === email) {
          member['registered'] = true;
          registeredCount++;
        }
      });
    });
    this.setState({
      list: list
    }, () => {
      console.log(`Found ${registeredCount} RSVPs out of ${list.length} members`);
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
    Axios.post(`/api/members/new/${this.state.APIKey}`, newMember)
    .then(res => {
      if (res.status === 200) {
        console.log('Email added successfully! Refreshing data...');
        this.getReport();
      } else console.error(`Error when attempting to add a new member: ${res.status}`);
    })
    .catch(err => console.error(`Error adding member: ${err}`));
  }

  resetEmail(event) {
    let email = event.target.id.toLowerCase();
    Axios.patch(`/api/members/reset/${email}/${this.state.APIKey}/`)
    .then(res => {
      if (res.status === 200) {
        console.log(`Email reset`);
        this.getReport();
      } else if (res.status === 500) {
        console.error(`Internal server error updating email ${email}`);
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
    if(confirm(`Please confirm removal of ${email}.  This operation is not reversable and existing RSVPs will remain in the database!`)) {
      Axios.delete(`/api/members/${email}/${this.state.APIKey}`)
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
    let email = event.target.id;
    //find and verify this member has not been emailed:
    for (let i = 0; i < this.state.list.length; i++) {
      let member = this.state.list[i];
      if (!member.tokenSent && member.email === email) {
        console.log(`Requesting to email token associated with ${member.email}`);
        Axios.patch(`/api/email/:email/${this.state.APIKey}`, {member: member})
        .then(res => {
          console.log(res.status);
          this.getReport();  //update list client side.
        })
        .catch(err => console.error(`Error sending token to ${email} : ${err}`));
        break; //to be extra safe, we should break from the loop.
      } else if (member.tokenSent && member.email === email) {
        console.error(`The token associated with this email has been sent.  Please reset the state if you wish to send it again.`);
      }
      if (i === this.state.list.length) console.error('ERROR: the email was not found in the list'); //this shouuld never be possible.
    }
  }

  emailAll() {
    //send a request to the server which will pull the official list and process it for emailing
    Axios.patch(`/api/email/all/${this.state.APIKey}`)
    .then(res =>  {
      console.log(res.status);
      this.getReport();
    })
    .catch(err => {
      console.error(`There was an error attemping to send all of the emails: ${err}`);
    });
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
          emailAll={this.emailAll}
          resetEmail={this.resetEmail}
          removeEmail={this.removeEmail} />
        </div>
      </div>
    );
  }
}

export default Admin;
