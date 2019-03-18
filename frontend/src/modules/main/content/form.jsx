//this module is a bit more complex
import styles from '../../../styles.css.js';

const Form = (props) => {
  return (
    <div style={styles.form} className='form'>
    <h1>Club Wawona</h1>
    Spring 2019
    <br></br>
    Sat May 25th, 2019
    <br></br>
    Dusk till Dawn
    <br></br>
    8 pm - 6 am
    <br></br>
    <br></br>
    This is a private event  You must be on the list to register.
    <br></br>
    <br></br>
    Club Wawona will be providing all supplies.  We ask for a $10/person donation to help us fund the drinks and snacks.  If you enjoy Club Wawona, please contribute to keep these events financially maintainable!
    <br></br>
    <br></br>
    <form className='form' onSubmit={props.submit}>
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
      <br></br>
      <label htmlFor='security'>Private Registration Key:
        <input
        style={styles.input}
        type='text'
        name='security'
        required></input>
      </label>
      <br></br>
      <label htmlFor='guests'>Do you have a guest?
      <br></br>
      (If you bring a guest, you are responsible for their good behavior!)
      <br></br>
      <br></br>

        <select name='guests' style={styles.selector}>
        <option value='0'>0</option>
        <option value='1'>1</option>
        </select>
      </label>
      <p>Please fill out this brief survey to help us procure supplies:</p>
      <label> Please choose your favorite 'party' beer:
        <select name='beer' style={styles.selector}>
          <option value="Animal">I'm a party animal, I'll drink anything</option>
          <option value='none'>I do not drink beer</option>
          <option value='Hops'>IPAs</option>
          <option value="Light">Kolsh/Lager/Pilsners</option>
          <option value='Sours'>Sours</option>
          <option value='Heavy'>Stouts/Porters</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <label> Please choose your favorite liquor:
        <select name='liquor' style={styles.selector}>
          <option value="Animal">No really, I have a serious problem </option>
          <option value='none'>I do not drink liquor</option>
          <option value='Vodka'>Vodka</option>
          <option value="Tequila">Tequila</option>
          <option value='Whiskey'>Whiskey</option>
          <option value='Gin'>Gin</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <label> Please choose your favorite wine:
        <select name='wine' style={styles.selector}>
          <option value="Animal">Liquor is quicker</option>
          <option value='none'>I do not drink wine</option>
          <option value='Cab'>Cabernet Sauvingon</option>
          <option value="Syrah">Syrah/Grenach/Mourvedre</option>
          <option value='Pinot'>Pinot Noir</option>
          <option value='White'>The non-red type of wine</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <label> If you do not drink alcohol, please let us know what beverage we can provide for your enjoyment:
        <input
        style={styles.input}
        type='text'
        name='other'></input>
      </label>
      <br></br>
      <br></br>
      <input
        style={styles.button}
        type='submit'
        value="GET LISTED!">
      </input>
    </form>
    </div>
  );
}


export default Form;
