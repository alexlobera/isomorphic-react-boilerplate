import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import routes from '../../routes';

const Root = ({ store, history }) => (
  <Router
    routes={routes()}
    history={history}
  />
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Root;
