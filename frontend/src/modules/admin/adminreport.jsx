import TypeReport from './typereport.jsx';

const AdminReport = (props) => {
  let report = props.report;

  if (report === null) return (<div></div>);

  return (<div className='report'>
      <br></br>
      <u>Summary</u>
      <br></br>
      {`Responses: ${report.primaryGuests}`}
      <br></br>
      {`Guests: ${report.secondaryGuests}`}
      <br></br>
      {`Total Attendance: ${report.secondaryGuests+report.primaryGuests}`}
      <br></br>
      <br></br>
      Response Preferences:
      <br></br>
      <br></br>
      <TypeReport data={report['beer']} key={'beer'} />
      <br></br>
      <TypeReport data={report['liquor']} key={'liquor'} />
      <br></br>
      <TypeReport data={report['wine']} key={'wine'} />
      <br></br>
    </div>);
}

export default AdminReport;
