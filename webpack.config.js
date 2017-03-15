var webpack = require('webpack');

module.exports = {
  entry : './public/scripts/entry.js',
  output : {
    path : __dirname,
    filename : './public/scripts/bundle.js'
  },
  module : {
    loaders : [
      {test : /\.css$/,loader : 'style-loader!css-loader'},
      {test : /\.scss$/,loader:"style-loader!css-loader!sass-loader"}
    ]
  },
  plugins : [
    new webpack.BannerPlugin('This file is create by kelvin!')
  ]
};
