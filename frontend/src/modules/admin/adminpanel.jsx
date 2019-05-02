import AdminReport from './adminreport.jsx';
import Members from './members.jsx';
import NewMember from './newmember.jsx';

const AdminPanel = (props) => {
  if (props.page === 'Report') {
      return (<AdminReport report={props.report} />);
  } else if (props.page === 'Members') {
      return (<Members
                list={props.list}
                sendEmail={props.sendEmail}
                emailAll={props.emailAll}
                resetEmail={props.resetEmail}
                removeEmail={props.removeEmail} />);
  } else if (props.page === 'AddMember') {
    return (<NewMember
            addMember={props.addMember} />
    );
  } else {
      return (
      <div>CONTENT RENDER ERROR</div>
      );
  }
}

export default AdminPanel;
