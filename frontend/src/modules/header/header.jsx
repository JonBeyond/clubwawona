import styles from '../../styles.css.js';

const Header = () => {
  return (
    <div style={styles.header} className='header'>
      <div className='pagetitle'><img src='https://s3-us-west-1.amazonaws.com/clubwawona/title.png'></img></div>
      <div className='pagehook'>Where the only limit is your imagination</div>
    </div>
  );
}

export default Header;
