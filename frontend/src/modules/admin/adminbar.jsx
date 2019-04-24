import styles from '../../styles.css.js';

const AdminBar = (props) => {
  return (
    <div className='navbar'>
      <ul style={styles.navBar} className='adminNavbar'>
        <li
          style={('Members' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='Members'
          onClick={props.navigate}>
          Member Management</li>
        <li
          style={('AddMember' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='AddMember'
          onClick={props.navigate}>
          New Member</li>
        <li
          style={('Report' === props.current) ? styles.navBarSelected : styles.navBarElement}
          className='Report'
          onClick={props.navigate}>
          RSVP Report</li>
      </ul>
    </div>
    );
}

export default AdminBar;
