import Navbar from './navbar/navbar.jsx';
import Content from './content/content.jsx';
import styles from '../../styles.css.js';
import axios from 'axios';

class Main extends React.Component {
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
      });
    }
  }

  handleRSVP(form) {
    event.preventDefault();
    this.setState({
      RSVP: {
        firstName: form.target.firstName.value,
        lastName: form.target.lastName.value,
        email: form.target.email.value,
        guests: Number(form.target.guests.value),
        security: form.target.security.value,
        beer: form.target.beer.value,
        liquor: form.target.liquor.value,
        wine: form.target.wine.value,
        other: form.target.other.value
      }
    }, () => {
      this.sendRSVP();
    })
  }

  sendRSVP() {
    axios.post('/api/RSVP', this.state.RSVP)
    .then(res => {
      if (res.data === 'badkey') {
        alert(`The private key provided did not match the record on file.
        \n
        Please try again and contact Club Wawona if the issue persists.`);
      } else {
        alert('Your RSVP was accepted! See you soon!');
      }
    })
    .catch((err) => {
      console.error(`Error sending RSVP: ${err}`);
    })
  }

  render() {
    return (
      <div className='maincontainer'>
        <Navbar navigate={this.handleNav} current={this.state.page}/>
        <div style={styles.main}>
          <Content page={this.state.page} submit={this.handleRSVP}/>
        </div>
      </div>
    );
  }
}

export default Main;
