const Login = (props) => {
  return (<div>
    Login:
    <br></br>
    <input type='text' id='endpoint' ></input>
    <br></br>
    <br></br>
    Password:
    <br></br>
    <input type='password' id='credentials'></input>
    <br></br>
    <br></br>
    <input type='submit' onClick={() => {props.login()}} value='Login'></input>
  </div>)
};

export default Login;
