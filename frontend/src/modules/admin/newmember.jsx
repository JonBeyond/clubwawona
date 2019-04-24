import styles from '../../styles.css.js';

const NewMember = (props) => {
  return (
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
  );
}

export default NewMember;
