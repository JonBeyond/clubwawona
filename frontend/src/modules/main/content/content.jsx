import About from './about.jsx';

const Content = (props) => {
  if (props.page === 'RSVP') {
    return (<div>TBD</div>);
  } else if (props.page === 'About') {
    return (<About />);
  } else if (props.page === 'Residents') {
    return (<div>TBD</div>);
  } else if (props.page === 'Photos') {
    return (<div>TBD</div>);
  } else if (props.page === 'Contact') {
    return (<div>TBD</div>);
  } else {
    return (
      <div>CONTENT RENDER ERROR</div>
    );
  }

}

export default Content;
