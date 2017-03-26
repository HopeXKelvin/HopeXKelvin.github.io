var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename : "[name].[contenthash].css",
  disable : process.env.NODE_DEV === "development"
});

module.exports = {
  entry : './public/scripts/entry.js',
  output : {
    path : __dirname,
    filename : './public/scripts/bundle.js'
  },
  module : {
    rules : [{
      test : /\.css$/,
      use : ExtractTextPlugin.extract({
        use : 'css-loader'
      })
    },
    {
      test : /\.scss$/,
      use : extractSass.extract({
        use : [{
          loader : "style-loader"
        },{
          loader : "css-loader" // 将 css 转换成 CommonJS
        },{
          loader : "sass-loader" // 将 sass文件 编译成 css
        }],
        fallback : "style-loader"
      })
    },{
      test : /\.(jpg|png)$/,
      loader : 'url?limit=50000'
    }]
  },
  plugins : [
    new webpack.BannerPlugin('This file is create by kelvin!'),
    extractSass
  ]
};
