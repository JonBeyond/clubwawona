const Member = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.member['name']}</td>
        <td>{props.member['email']}</td>
        <td>{JSON.stringify(props.member['tokenSent'])}</td>
        <td>{JSON.stringify(props.member['registered'])}</td>
        <td><button id={props.member['email']} onClick={props.sendEmail} >Send Email</button></td>
        <td><button id={props.member['email']} onClick={props.resetEmail} >Reset</button></td>
        <td><button id={props.member['email']} onClick={props.removeEmail} >Remove</button></td>
      </tr>
      <tr>
        <td colSpan='7'>TOKEN: {props.member['token']}</td>
      </tr>
      <tr>
        <td colSpan='7'>————————————————————————</td>
      </tr>
    </tbody>);
}
export default Member;
