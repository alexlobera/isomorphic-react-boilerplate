import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes from '../shared/routes';

const reactApp = (req, res) => {
  // Tip: https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {    
      const InitialComponent = (
        <RouterContext {...renderProps} />
      );
      // Tip: https://facebook.github.io/react/docs/top-level-api.html
      const componentHTML = renderToString(InitialComponent);
      const HTML = `
        <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Isomorphic Redux workshop | javaScript Lab London</title>
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>    
      `;
      res.status(200).send(HTML)
    } else {
      res.status(404).send('Not found')
    }
  });
}

export default reactApp;
