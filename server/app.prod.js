import webpack from 'webpack';
import config from '../webpack.prod.config';
import express from 'express';

const app = express();
const compiler = webpack(config);

// To be implemented
