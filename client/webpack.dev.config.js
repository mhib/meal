const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.default.config');

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500;

config.entry.app.push(
  `webpack-dev-server/client?http://localhost:${hotRailsPort}`,
  'webpack/hot/only-dev-server'
);

config.output = {
  filename:   '[name]-bundle.js',
  path:       path.join(__dirname, 'public'),
  publicPath: `http://localhost:${hotRailsPort}/`
};

config.module.loaders.push(
  {
    test:    /\.jsx?$/,
    loader:  'babel',
    exclude: /node_modules/,
    query:   {
      plugins: [
        [
          'react-transform',
          {
            superClasses: ['React.Component', 'BaseComponent', 'Component'],
            transforms:   [
              {
                transform: 'react-transform-hmr',
                imports:   ['react'],
                locals:    ['module']
              }
            ]
          }
        ]
      ]
    }
  },
  {
    test:    /\.css$/,
    loaders: ['style', 'css', 'postcss']
  },
  {
    test:    /\.scss$/,
    loaders: ['style', 'css', 'postcss', 'sass', 'sass-resources']
  },
  {
    test:   require.resolve('jquery-ujs'),
    loader: 'imports?jQuery=jquery'
  }
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

config.devtool = 'source-map';

console.log('Webpack dev build for Rails'); // eslint-disable-line no-console

module.exports = config;
