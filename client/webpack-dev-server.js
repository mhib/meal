/* eslint no-var: 0, no-console: 0 import/default: 0 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.dev.config';

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500;

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  contentBase:        `http://lvh.me:${hotRailsPort}`,
  publicPath:         webpackConfig.output.publicPath,
  hot:                true,
  inline:             true,
  historyApiFallback: true,
  quiet:              false,
  noInfo:             false,
  lazy:               false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats:              {
    colors:   true,
    hash:     false,
    version:  false,
    chunks:   false,
    children: false
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});

devServer.listen(hotRailsPort, '127.0.0.1', err => {
  if (err) console.error(err);
  console.log(
    `=> 🔥  Webpack development server is running on port ${hotRailsPort}`
  );
});
