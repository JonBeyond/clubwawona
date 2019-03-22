const Login = (props) => {
  return (<div>
    <input name='credentials'></input>
    <input type='submit' onClick={props.login} value='Login'></input>
  </div>)
};

export default Login;
