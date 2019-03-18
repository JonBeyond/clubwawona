import styles from '../../styles.css.js';

const Header = () => {
  return (
    <div style={styles.header} className='header'>
      <div className='pagetitle'><img src='https://s3-us-west-1.amazonaws.com/clubwawona/title.png'></img></div>
      <div className='pagehook'>Where the only limit is your imagination</div>
    </div>
  );
}

const randomHook = () => {
  // const hooks = ['Welcome to the party', 'This is how we do'];
  // return hooks[~~(Math.random()*hooks.length)];
  return '';
}

export default Header;
