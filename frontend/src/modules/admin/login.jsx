const Login = (props) => {
  return (<div>
    <input id='credentials'></input>
    <input type='submit' onClick={() => {props.login()}} value='Login'></input>
  </div>)
};

export default Login;
