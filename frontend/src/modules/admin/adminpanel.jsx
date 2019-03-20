import AdminReport from './adminreport.jsx';
import Members from './members.jsx';

const AdminPanel = (props) => {
  if (props.page === 'Report') {
      return (<AdminReport report={props.report} />);
  } else if (props.page === 'Members') {
      return (<Members />);
  // } else if (props.page === 'Emails') {
  //     return (<AdminEmails />);
  } else {
      return (
      <div>CONTENT RENDER ERROR</div>
      );
  }
}

export default AdminPanel;
