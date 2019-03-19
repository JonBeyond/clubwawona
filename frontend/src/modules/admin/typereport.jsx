const getMax = (obj) => {
  let max = 0, maxKey = null;
  for (let key in obj) {
    if(obj[key] >= max) {
      max = obj[key];
      maxKey = key;
    }
  }
  return maxKey;
}

const percentages = (matrix) => {
  let total = 0;
  matrix.forEach(entry => {
    total+=entry[1];
  });
  matrix.forEach(entry => {
    entry[1] = Math.round(entry[1]*100/total).toString()+'%';
  });
  return matrix;
}

const TypeReport = (props) => {
  let dataCopy = Object.assign({},props.data), rows = [];

  //remove unimport numbers for percentages:
  delete dataCopy['none'];
  delete dataCopy['Animal'];

  let length = Object.keys(dataCopy).length;

  for (let i = 0; i < length; i++) {
    let key = getMax(dataCopy);
    rows.push([key,dataCopy[key]])
    delete dataCopy[key];
  }

  rows = percentages(rows);

  return (
    <div>
      <b><u>Type - %</u></b>
      <br></br>
      {rows.map(row => {
        return (<div>
          <span>{row[0]} - {row[1]}</span>
        </div>)
      })}
    </div>
  )
}

export default TypeReport;
