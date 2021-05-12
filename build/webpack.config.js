const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  const demo = env.demo
  console.log('starting demo: ', demo)
  return {
    mode: 'development',
    entry: { index: `./src/${demo}/index.ts` },
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
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.glsl$/,
          loader: 'raw-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@common': path.resolve(__dirname, '../src/common'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [`./src/${demo}/index.html`],
      }),
    ],
  }
}
