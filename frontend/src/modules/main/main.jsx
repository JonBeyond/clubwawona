import Navbar from './navbar/navbar.jsx';
import Content from './content/content.jsx';
import styles from '../../styles.css.js';
// import axios from 'axios';

//This container controls the state of all content
//TODO: think about the best way to handle the RSVP fourm handler
//TODO: especially consider about updating an RSVP
//TODO: on the backend side, need a way to process the RSVP data
//TODO: :D
class Main extends React.Component{
  constructor() {
    super();
    this.state = {
      page: 'RSVP', //can easily change default view here.
      RSVP: {}
    }
    this.handleNav = this.handleNav.bind(this);
    this.handleRSVP = this.handleRSVP.bind(this);
  }

  handleNav(event) {
    if (event.target.className !== this.state.page) { //dont generate a new render unless we need to.
      this.setState({
        page: event.target.className
      }, () => {
        console.log(`nNavstate update to ${this.state.page}`); //TODO: for dev only; remove
      })
    }
  }

  handleRSVP(form) {
    event.preventDefault();
    this.setState({
      RSVP: {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        guests: event.target.guests.value
      }
    }, () => {
      this.saveRSVP();
    })
  }

  render() {
    return (
      <div className='maincontainer'>
        <Navbar navigate={this.handleNav} />
        <div style={styles.main}>
          <Content page={this.state.page} />
        </div>
      </div>
    );
  }
}

export default Main;
