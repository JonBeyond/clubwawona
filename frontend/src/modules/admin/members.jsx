import Member from './member.jsx';
import styles from '../../styles.css.js';

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
    <div>
    <div> New Member Form:
      <form className='newmember'>
        <label htmlFor='firstName'>First Name:
          <input
          style={styles.input}
          type='text'
          name='firstName'
          required>
          </input>
        </label>
        <br></br>
        <label htmlFor='lastName'>Last Name:
          <input
          style={styles.input}
          type='text'
          name='lastName'
          required></input>
        </label>
        <br></br>
        <label htmlFor='email'>Email:
          <input
          style={styles.input}
          type='email'
          name='email'
          required></input>
        </label>
        <input
        style={styles.button}
        type='submit'
        value="Add new member!">
      </input>
      </form>
    </div>
    <div className='memberslist'>
      <table style={style}>
        <thead>
          <tr>
            <td style={cell}>Name</td>
            <td style={cell}>Email</td>
            <td style={cell}>Token Sent?</td>
            <td style={cell}>Send Token</td>
            <td style={cell}>Reset Token State</td>
          </tr>
        </thead>
        {props.list.map(member => {
          return (<Member member={member}
                          sendEmail={props.sendEmail}
                          resetEmail={props.resetEmail} />);
          })}
      </table>
    </div>
    </div>);
}

export default Members;
