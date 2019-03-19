
const statistics = (object) => {
  let guestCount = object.primaryGuests + object.secondaryGuests;
  let wine = percentages(object.wine);
  let beer = percentages(object.beer);
  let liquor = percentages(object.liquor);

}

const percentages = (object) => {
  let total = 0;
  for (let type in object) {
    total += object[type];
  }
  for(let type in object) {
    object[type] = (Math.round(object[type]*100/total)).toString()+'%';
  }
  return object;
}

const AdminReport = (props) => {
//TODO: make something pretty!
//TODO: CSS!!
  let report = props.report;
  statistics(report);

  return (<div className='report'>
    {`Replies: ${report.primaryGuests}`}
    <br></br>
    {`Guests: ${report.secondaryGuests}`}
    <br></br>
    {`List: ${JSON.stringify(report.registrations)}`}
    <br></br>
    {`Beer Pref: TBD`}
    <br></br>
    {`Wine Pref: TBD`}
    <br></br>
    {`Liquor Pref: TBD`}
    <br></br>
    {`Other things: ${JSON.stringify(report.other)}`}
    </div>);
}

export default AdminReport;
