// 5
const path = require('path')
// 10
const HTMLPlugin = require('html-webpack-plugin')
// 12
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  entry: './src/app.js',
  output: {
    // 9
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    port: 3000
  },
  plugins: [
    // 10-1
    new HTMLPlugin({
      template: './src/index.html'
    }),
    // 12-1
    new CleanWebpackPlugin()
  ],
  // 20
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}