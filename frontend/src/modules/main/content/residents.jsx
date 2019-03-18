import styles from '../../../styles.css.js';

const Residents = () => {
  return (
    <div>
      <h1>Mitztronic</h1>
      <div>
        <img src='https://s3-us-west-1.amazonaws.com/clubwawona/mitztronic.png'></img>
      </div>
      <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fmitztronic%2Fawaken%2F" frameBorder="0" ></iframe>
      <br></br>
      <div className="bio" style={styles.bio}>
      <p>Electronic music wizard, most at home in the deserts of California, Mitztronic focuses on collecting and sharing Desert House from across the globe, at events across San Francisco, whether they be in homes, caves, under bridges or inside bunkers, at Burning Man in the dust, or in the forest mist along the Oregon coast.</p>
      <p>After years of traversing genres including trance, house, techno, electro-house, psy-trance, drum ‘n bass, downtempo/chill, indie dance, groove house, hip-hop, trip-hop, and beyond, Mitztronic has landed as a resident of Club Wawona.</p>

      </div>
      <div></div>

    </div>
  );
}

export default Residents;
