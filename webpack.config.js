module.exports = {
  entry: __dirname + '/frontend/src/painter.jsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
    output: {
    filename: 'bundle.js',
    path: __dirname + '/frontend/dist'
  }
};
