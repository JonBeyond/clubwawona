// import styles from './styles.css.js'; //TODO:
// import axios from 'axios';
import Navbar from './navbar/navbar.jsx';
import Content from './content/content.jsx';
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
        console.log(`navstate update to ${this.state.page}`);
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
