const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { index: "./src/particle/index.js" },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
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
      {
        test: /\.glsl$/,
        loader: "raw-loader",
      },
    ],
  },
  plugins: [
      new CopyPlugin({
          patterns: [
            'src/particle/index.html'
          ]
      })
  ],
};
