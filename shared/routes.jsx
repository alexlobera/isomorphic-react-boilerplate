import React     from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Page from './components/Page';
import Photos from './components/Photos';

export default (
  <Route>
    <Route name="app" component={App} path="/" />
    <Route name="page" component={Page} path="/test" />
    <Route name="photos" component={Photos} path="/photos" />
  </Route>
);