import styles from '../../../styles.css.js';

const Navbar = (props) => {
  return (
    <div>
      <ul style={styles.navBar} className='navigationbar'>
        <li style={styles.navBarElement} className='RSVP' onClick={props.navigate}>RSVP</li>
        <li style={styles.navBarElement} className='About' onClick={props.navigate}>About</li>
        <li style={styles.navBarElement} className='Residents' onClick={props.navigate}>Residents</li>
        <li style={styles.navBarElement} className='Contact' onClick={props.navigate}>Contact</li>
      </ul>
      <div style={styles.navDivider}>
      <img src='https://s3-us-west-1.amazonaws.com/clubwawona/navbar.png'></img>
      </div>
      <br></br>
    </div>
  );
}

export default Navbar;
