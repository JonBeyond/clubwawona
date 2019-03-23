const Login = (props) => {
  return (<div>
    Enter the administration password:
    <br></br>
    <input id='credentials' ></input>
    <br></br>
    Enter the entry point:
    <br></br>
    <input id='endpoint'></input>
    <br></br>
    <input type='submit' onClick={() => {props.login()}} value='Login'></input>
  </div>)
};

export default Login;
