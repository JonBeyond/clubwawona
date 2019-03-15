const Navbar = (props) => {
  return (
    <div>
      <ul className='navigationbar'>
        <li className='RSVP' onClick={props.navigate}>RSVP</li>
        <li className='About' onClick={props.navigate}>About</li>
        <li className='Residents' onClick={props.navigate}>Residents</li>
        <li className='Music' onClick={props.navigate}>Music</li>
        <li className='Photos' onClick={props.navigate}>Photos</li>
        <li className='Contact' onClick={props.navigate}>Contact</li>
      </ul>
    </div>
  );
}

export default Navbar;
