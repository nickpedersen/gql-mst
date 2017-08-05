import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';

import schema from './schema';

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

const app = express();

// Allow CORS
app.use(cors());

// Graphql endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
const server = createServer(app);

// Handy debugging tool, disabled on prod
if (env === 'dev') {
  app.use(
    '/graphiql',
    bodyParser.json(),
    graphiqlExpress({
      endpointURL: '/graphql',
    })
  );
} else {
  // Static serving the build folder
  app.use(express.static(path.resolve(__dirname, '..', '../frontend/build')));

  // Allow any route to resolve to index
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', '../frontend/build', 'index.html')
    );
  });
}

server.listen(port, () => {
  console.log('App listening on port ' + port + ' 🚀');
});
