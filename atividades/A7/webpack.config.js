const path = require("path");
const HtmlWebpPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    /* entry: 'src/index.jsx' /*Indica o arquivo inical que vai começar a nossa aplicação*/
    path: path.resolve(__dirname, "dist", ""),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    })
  ],
  module: {
      rules: [
          {
              test: /\.jsx$/,
              exclude: /node_modules/,
              use: 'babel-loader'
          }
      ]
  },
};
