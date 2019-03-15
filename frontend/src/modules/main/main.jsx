// import styles from './styles.css.js'; //TODO:
// import axios from 'axios';
import Navbar from './navbar/navbar.jsx';
import Content from './content/content.jsx';

//This container controls the state of all content
//TODO: think about the best way to handle the RSVP fourm handler
//TODO: especially consider about updating an RSVP
//TODO: on the backend side, need a way to process the RSVP data
//TODO: :D
class Main extends React.Component{
  constructor() {
    super();
    this.state = {
      page: 'RSVP' //can easily change default view here.
    }
    this.handleNav = this.handleNav.bind(this);
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

  render() {
    return (
      <div>Main Container
        <Navbar navigate={this.handleNav} />
        <Content page={this.state.page} />
      </div>
    );
  }
}

export default Main;
