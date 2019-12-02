const path = require('path'); // import path from 'path';

module.exports = {
  entry: './src/index.js',
  output: {
	filename: 'main.js',
	  // __dirname - получить путь до файла.
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool помогает отслеживать ошибки выполнения с помощью F12.
  devtool: 'inline-source-map'
};