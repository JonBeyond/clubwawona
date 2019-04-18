import Member from './member.jsx';

const Members = (props) => {
  return (
    <div className='memberslist'>
      {props.list.map(member => {
        return (<Member member={member}
                        sendEmail={props.sendEmail}
                        resetEmail={props.resetEmail} />);
      })}
    </div>);
}

export default Members;
