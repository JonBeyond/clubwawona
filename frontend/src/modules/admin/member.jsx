const Member = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.member['name']}</td>
        <td>{JSON.stringify(props.member['tokenSent'])}</td>
        <td>{props.member['email']}</td>
        <td><button id={props.member['email']} onClick={props.sendEmail} >Send Email</button></td>
        <td><button id={props.member['email']} onClick={props.resetEmail} >Reset Email</button></td>
      </tr>
      <tr>
        <td colSpan='5'>TOKEN: {props.member['token']}</td>
      </tr>
      <tr>
        <td colSpan='5'>————————————————————</td>
      </tr>
    </tbody>);
}
export default Member;
