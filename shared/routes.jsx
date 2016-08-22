import React     from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Page from './components/Page';

export default (
  <Route>
    <Route name="app" component={App} path="/" />
    <Route name="page" component={Page} path="/test" />
  </Route>
);