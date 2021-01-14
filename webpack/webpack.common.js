const Fs = require('fs');
const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [];
const files = Fs.readdirSync(Path.resolve(__dirname, '../src'));
files.forEach( (file) => {
  if (!file.match(/\.html$/)) {
    return;
  }

  pages.push(new HtmlWebpackPlugin({
    filename: file,
    template: Path.resolve(__dirname, '../src', file),
  }));
});

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },

  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../public'), to: 'public' }] }),
  ].concat(pages),

  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
