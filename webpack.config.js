
require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
// if (process.env.NODE_ENV === 'production') {
//   mode = 'production';
// }

module.exports = {
  mode,
  target: 'web',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'public'),
    clean: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(c|s[ac])ss$/i,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource' 
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    liveReload: false,
    open: true,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
      'process.env.IMGUR_CLIENT_ID': JSON.stringify(process.env.IMGUR_CLIENT_ID),
      'process.env.IMGUR_CLIENT': JSON.stringify(process.env.IMGUR_CLIENT),
      'process.env.CATEGORIES_URL': JSON.stringify(process.env.CATEGORIES_URL),
      'process.env.PRODUCTS_URL': JSON.stringify(process.env.PRODUCTS_URL),
      'process.env.SALES_URL': JSON.stringify(process.env.SALES_URL),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      title: 'adminka',
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: [".js"],
  },
};