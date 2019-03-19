import styles from '../../../styles.css.js';
import AdminBar from './adminbar.jsx';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      report: {},
      list: [],
      page: 'Report'
    };
    this.navigate = this.navigate.bind(this);
  }

  getReport() {
    console.log('get report incomplete');
    //get report data
  }

  addMember() {
    console.log('add member incomplete');
    //take in a an email (csv), create MD5, and store
  }

  removeMember() {
    console.log('add member incomplete');
    //take in a an email (csv), create MD5, and store
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

  componentDidMount() {
    //get data
  }

  render() {
    return (
      <div className='Admin'>
        <AdminBar current={this.state.page} navigate={this.navigate} />
        <div className='memberPanel'>
          <button onClick={this.getReport} >Generate Report</button>
          <button onClick={this.getList} >Retrieve List</button>
          <button onClick={this.addMember} >Add member</button>
          <button onClick={this.removeMember}>Remove Member</button>
          <button onClick={this.sendEmail} >Emailz</button>
        </div>
        <div className='report'>
        {}
        </div>
        <div className='list'>
        list
        </div>
      </div>
    );
  }


}

export default Admin;
