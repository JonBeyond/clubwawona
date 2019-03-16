//this module is a bit more complex
import styles from '../../../styles.css.js';

const Form = () => {
  return (
    <div style={styles.form} className='form'>
    Club Wawona
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
    Club Wawona will will be providing all supplies.  We are asking for a $10/person donation to help us pay for alcohol and snacks.  If you enjoy Club Wawona, please contribute to keep these events financially maintainable!
    <br></br>
    <br></br>
    <form className='form'>
      <label htmlFor='firstName'>First Name:
        <input
        style={styles.input}
        id='firstName'
        type='text'
        name='firstName'
        required>
        </input>
      </label>
      <label htmlFor='lastName'>Last Name:
        <input
        style={styles.input}
        id='lastName'
        type='text'
        name='lastName'
        required></input>
      </label>
      <label htmlFor='email'>Email (your email MUST be on the list to register):
        <input
        style={styles.input}
        id='email'
        type='email'
        name='name'
        required></input>
      </label>
      <label htmlFor='guests'>If you wish to bring a guest, please email clubwawona@gmail.com.
      <br></br>
      <br></br>
      </label>
      Please fill out this brief survey to help us procure supplies:
      <br></br>
      <label> Please choose your favorite class of beer:
        <select>
          <option value="Animal">I'm a party animal, I'll drink anything</option>
          <option value='Hops'>IPAs</option>
          <option value="Light">Kolsh/Lager/Pilsners</option>
          <option value='Sours'>Sours</option>
          <option value='Heavy'>Stouts/Porters</option>
        </select>
      </label>
      <br></br>
      <label> Please choose your favorite liquor:
        <select>
          <option value="Animal">No really, I a have a serious problem </option>
          <option value='Vodka'>Vodka</option>
          <option value="Tequila">Tequila</option>
          <option value='Whiskey'>Whiskey</option>
          <option value='Gin'>Gin</option>
        </select>
      </label>
      <br></br>
      <label> Please choose your favorite wine:
        <select>
          <option value="Animal">Liquor is quicker</option>
          <option value='Cab'>Cabernet Sauvingon</option>
          <option value="Syrah">Syrah/Grenach/Mourvedre</option>
          <option value='Pinot'>Pinot Noir</option>
          <option value='White'>The non-red type of wine</option>
        </select>
      </label>
      <br></br>
      <br></br>
      <input
        style={styles.button}
        type='submit'
        id='submit'
        value='Submit'>
      </input>
    </form>
    </div>
  );
}


export default Form;
