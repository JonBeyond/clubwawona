
const Header = () => {
  return (
    <div className='header'>
      <div className='pagetitle'>Wawona</div>
      <div className='pagehook'>{randomHook()}</div>
    </div>
  );
}

const randomHook = () => {
  const hooks = ['Welcome to the party', 'This is how we do'];
  return hooks[~~(Math.random()*hooks.length)];
}

export default Header;
