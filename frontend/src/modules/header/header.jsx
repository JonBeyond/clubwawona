import styles from '../../styles.css.js';

const Header = () => {
  return (
    <div style={styles.header} className='header'>
      <div className='pagetitle'>Wawona</div>
      <div className='pagehook'>{randomHook()}</div>
    </div>
  );
}

const randomHook = () => {
  // const hooks = ['Welcome to the party', 'This is how we do'];
  // return hooks[~~(Math.random()*hooks.length)];
  return '';
}

export default Header;
