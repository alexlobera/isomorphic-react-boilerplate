import webpack from 'webpack';
import express from 'express';
import log4js from 'log4js';
import fs from 'fs';
import https from 'https';
import compression from 'compression';
import bodyParser from 'body-parser';
import config from '../webpack.prod.config';
import reactApp from './app';

const app = express();
const compiler = webpack(config);

const logger = log4js.getLogger();
logger.setLevel('TRACE');

// @TODO move this to a config file
properties = {
	application: {
		'port-https': 443,
		'port': 80
	},
	env: 'prod'
};

if (properties.env === 'prod') {
  log4js.configure({
    appenders: [
      {
        type: 'console',
        layout: { type: 'basic' },
      },
    ], replaceConsole: true,
  });
}

/**
 *   Config logger
 */
app.use(log4js.connectLogger(logger, {
  level: log4js.levels.DEBUG,
  format: ':method :url - :status - :response-time ms',
}));

/**
 *   React app
 */
app.use(reactApp);

/**
 * Application specifics
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(compression());

/**
 *   server - http
 */
const server = app.listen(properties.application.port, () => {
  const { address, port } = server.address();
  logger.info(`Environment = ${properties.env}`);
  logger.info(`Api listening at http://${address}:${port}`);
});


/**
 *   server - https
 */
const httpsServer = https.createServer(
  {
    key: fs.readFileSync('./config/certificates/key.pem'),
    cert: fs.readFileSync('./config/certificates/fullchain.pem'),
  },
  app
).listen(properties.application['port-https'], () => {
  const { address, port } = httpsServer.address();
  logger.info(`Environment = ${properties.env}`);
  logger.info(`Api listening at https://${address}:${port}`);
});