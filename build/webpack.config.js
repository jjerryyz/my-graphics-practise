const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  const demo = env.demo
  console.log('starting demo: ', demo)
  return {
    mode: 'development',
    entry: { index: `./src/${demo}/index.js` },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, `../dist/${demo}/`),
      port: env.port || 9000,
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, `../dist/${demo}/`),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
        {
          test: /\.glsl$/,
          loader: 'raw-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [`src/${demo}/index.html`],
      }),
    ],
  }
}
