const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "app.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "client.js",
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3000,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable hot reloading
  ],
  node: {
    fs: 'empty'
  }
};