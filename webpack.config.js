const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CSSPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'

module.exports = {
  mode,
  entry: path.resolve(__dirname, 'src', 'app.js'),
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    port: 3000,
    open: true,
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CSSPlugin({
      filename: 'style.[chunkhash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [devMode ? 'style-loader' : CSSPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
    ],
  },
}
