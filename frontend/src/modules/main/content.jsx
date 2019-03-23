import About from './about.jsx';
import Residents from './residents.jsx';
import Contact from './contact.jsx';
import RSVP from './form.jsx';
import Admin from '../admin/admin.jsx';

const Content = (props) => {
  if (props.page === 'RSVP') {
    return (<RSVP submit={props.submit}/>);
  } else if (props.page === 'About') {
    return (<About />);
  } else if (props.page === 'Residents') {
    return (<Residents />);
  } else if (props.page === 'Contact') {
    return (<Contact />);
  } else if (props.page === 'Admin') {
    return (<Admin />);
  } else {
    return (
      <div>CONTENT RENDER ERROR</div>
    );
  }

}

export default Content;
