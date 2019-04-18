const style = { //keep this style here, because it's an admin style? TODO: move to styles.css.js
  textAlign: 'center',
  padding: '10px',
  width: '600px',
  border: '1px solid white',
  boxSizing: 'border-box',
  display: 'inline-block'

}

const Member = (props) => {
  // console.log(props.member);
  return (<div>
    <table style={style}>
    <thead>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Email Sent?</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{props.member['name']}</td>
        <td>{JSON.stringify(props.member['tokenSent'])}</td>
        <td>{props.member['email']}</td>
        <td><button onClick={props.sendEmail} >Send Email</button></td>
        <td><button onClick={props.resetEmail} >Reset Email</button></td>
      </tr>
      <tr>
        <td colSpan='5'>{props.member['token']}</td>
      </tr>
    </tbody>
    </table>
  </div>)
}




export default Member;
