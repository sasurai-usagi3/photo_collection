const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSnano = require('cssnano');

module.exports = {
  mode: 'production',
  entry: {
    application: './src/javascripts/application.js',
    style: './src/stylesheets/application.sass'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                new CSSnano({
                  preset: 'default'
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'application.css'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs')
  }
}
