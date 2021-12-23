const path = require('path');

module.exports = {
  entry: './src/drama.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
};