
var webpack = require('webpack');

const config = {
  debug: process.env.NODE_ENV === 'development'
};

const plugins = [
  // new webpack.ProvidePlugin({ 'Promise': 'imports?this=>global!exports?global.Promise!es6-promise' }),
  new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
];

if (config.debug) {
  console.warn(' *** DEBUG MODE *** ');
  console.warn(' *** NO COMPRESSION *** ');
  plugins.push(new webpack.optimize.UglifyJsPlugin({ munge: true, compress: { warnings: false } }));
};

module.exports = {
  entry: './index.js',
  output: {
    libraryTarget: 'umd',
    library: 'slim-fetchy',
    filename: `dist/slim-fetchy.js`,
    publicPath: '/',
  },
  debug: config.debug,
  stats: { colors: true, reasons: true },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  }
};
