import React     from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Page from './components/Page';
import PhotosContainer from './containers/PhotosContainer';

export default (
  <Route>
    <Route name="app" component={App} path="/" />
    <Route name="page" component={Page} path="/test" />
    <Route name="photos" component={PhotosContainer} path="/photos" />
  </Route>
);