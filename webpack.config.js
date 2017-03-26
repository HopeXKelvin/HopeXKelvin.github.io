var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry : './public/scripts/entry.js',
  output : {
    path : __dirname,
    filename : './public/scripts/bundle.js'
  },
  module : {
    rules : [
      {
        test : /\.css$/,
        use : ExtractTextPlugin.extract({
          use : 'css-loader'
        })
      }
    ],
    loaders : [
      {test : /\.css$/,loader : 'style-loader!css-loader'},
      {test : /\.scss$/,loader:"style-loader!css-loader!sass-loader"},
      {test : /\.(jpg|png|gif)$/,}
    ]
  },
  plugins : [
    new webpack.BannerPlugin('This file is create by kelvin!'),
    new ExtractTextPlugin('styles.css')
  ]
};
