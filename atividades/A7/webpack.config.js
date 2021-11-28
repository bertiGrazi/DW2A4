const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    /* entry: 'src/index.jsx' /*Indica o arquivo inical que vai começar a nossa aplicação*/
    path: path.resolve(__dirname, "dist", ""),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
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
