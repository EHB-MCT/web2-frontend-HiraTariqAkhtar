const path = require('path');

module.exports = {
  entry:{
   drama: './src/drama.js',
   login: './src/login.js'
  } ,
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
  },
  mode: 'development'
};