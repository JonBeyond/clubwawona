const Login = (props) => {
  return (<div>
    Password:
    <br></br>
    <input type='password' id='credentials' ></input>
    <br></br>
    <br></br>
    Gateway:
    <br></br>
    <input type='password' id='endpoint'></input>
    <br></br>
    <br></br>
    <input type='submit' onClick={() => {props.login()}} value='Login'></input>
  </div>)
};

export default Login;
