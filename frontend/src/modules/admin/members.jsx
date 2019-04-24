import Member from './member.jsx';

const style = { //keep this style here, because it's an admin style? TODO: move to styles.css.js
  textAlign: 'center',
  padding: '10px',
  width: '600px',
  border: '1px solid white',
  boxSizing: 'border-box',
  display: 'inline-block'
}

const cell = {
  border: '1px solid white',
  padding: '5px',
  margin: '5px'
}

const Members = (props) => {
  return (
    <div className='memberslist'>
      Size of list: {`${props.list.length}`}
      <table style={style}>
        <thead>
          <tr>
            <td style={cell}>Name</td>
            <td style={cell}>Email</td>
            <td style={cell}>Token Sent?</td>
            <td style={cell}>Send Token</td>
            <td style={cell}>Reset State</td>
            <td style={cell}>Remove Email</td>
          </tr>
        </thead>
        {props.list.map(member => {
          return (<Member member={member}
                          sendEmail={props.sendEmail}
                          resetEmail={props.resetEmail}
                          removeEmail={props.removeEmail} />);
          })}
      </table>
    </div>);
}

export default Members;
