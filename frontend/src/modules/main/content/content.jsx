import About from './about.jsx';
import Photos from './photos.jsx';
import Residents from './Residents.jsx';
import Contact from './Contact.jsx';
import RSVP from './form.jsx';

const Content = (props) => {
  if (props.page === 'RSVP') {
    return (<RSVP />);
  } else if (props.page === 'About') {
    return (<About />);
  } else if (props.page === 'Residents') {
    return (<Residents />);
  } else if (props.page === 'Photos') {
    return (<Photos />);
  } else if (props.page === 'Contact') {
    return (<Contact />);
  } else {
    return (
      <div>CONTENT RENDER ERROR</div>
    );
  }

}

export default Content;
