const webpack = require('webpack');

module.exports = {
  entry: {
    App: './static/js/components/App.jsx'
  },
  output: {
    path: `${__dirname}/static/build`,
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0', 'react-hmre']
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass?sourceMap'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    react: 'React'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
