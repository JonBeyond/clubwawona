import AdminBar from './adminbar.jsx';
import AdminPanel from './adminpanel.jsx';
import Login from './login.jsx';
import Axios from 'axios';
// import key from '../../../../config.js';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      report: [],
      list: [],
      page: 'Login',
      cleared: false
    };
    this.navigate = this.navigate.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
  }

  adminLogin() {
    let credential = document.getElementById('credentials').value;
    Axios.post('/api/authenticate', {credential: credential}) //TODO: don't send plaintext passwords over HTTP.
    .then(res => {
      if (res.data === 'PASSED') {
        this.postLogin();
        this.setState({
          page: 'Report',
          cleared: true
        });
      } else alert('Bad password.');
    })
    .catch(err => {
      console.log(`Error authenticating: ${err}`);
    });
  }

  postLogin() {
    Axios.get('/api/report', {params: {
      key: ''
    }})
    .then(res => {
      this.setState({
        report: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });

      //TODO: add first and last name to the master list
    Axios.get('api/members')
    .then(res => {
      this.setState({
        list: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  navigate(event) {
    if (event.target.className !== this.state.page) { //dont generate a new render unless we need to.
      this.setState({
        page: event.target.className
      });
    }
  }

  sendEmail(email) {
    console.log('this feature is not yet available');
  }

  sendEmails() {
    console.log('this feature is not yet available');
  }

  render() {
    if (this.state.cleared === false) {
      return (<div>
        <Login login={this.adminLogin} />
      </div>)
    } else
    return (
      <div className='Admin'>
        <AdminBar current={this.state.page} navigate={this.navigate} />
        <div className='memberPanel'>
          <AdminPanel page={this.state.page} report={this.state.report} list={this.state.list} />
        </div>
      </div>
    );
  }
}

export default Admin;
