import Member from './member.jsx';

const Members = (props) => {

  return (<div className='memberslist'>
  {props.list.map((member) => {
    return (<Member member={member} />);
  })}
  </div>);
}

export default Members;
