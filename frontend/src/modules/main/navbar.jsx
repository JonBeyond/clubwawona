import styles from '../../styles.css.js';

const Navbar = (props) => {
  return (
    <div>
      <ul style={styles.navBar} className='navigationbar'>
        <li
          style={('RSVP' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='RSVP'
          onClick={props.navigate}>
          RSVP</li>
        <li
          style={('About' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='About'
          onClick={props.navigate}>
          About</li>
        <li
          style={('Residents' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='Residents'
          onClick={props.navigate}>
          Residents</li>
        <li
          style={('Contact' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='Contact'
          onClick={props.navigate}>
          Contact</li>
          <li
          style={('Admin' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='Admin'
          onClick={props.navigate}>
          Admin</li>
      </ul>
      <div style={styles.navDivider}>
      <img src='https://s3-us-west-1.amazonaws.com/clubwawona/navbar.png'></img>
      </div>
      <br></br>
    </div>
  );
}

export default Navbar;
