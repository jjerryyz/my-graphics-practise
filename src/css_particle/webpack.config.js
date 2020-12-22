const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: { presets: [["@babel/preset-env", { targets: "defaults" }]] },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
};
