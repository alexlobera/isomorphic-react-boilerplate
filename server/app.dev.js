import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.dev.config';
import reactApp from './app';
import express from 'express';

const compiler = webpack(config);
const app = express();
  
// hot reload
app.use(WebpackDevMiddleware(compiler, {
  noInfo: true,
  reload: true,
  publicPath: config.output.publicPath,
}));

app.use(WebpackHotMiddleware(compiler));

// Serve the assets
app.use(express.static('public'));
app.use(express.static('config'));

app.use(reactApp);

app.listen(config.port);
console.log(`Listening at http://${config.host}:${config.port}`);
