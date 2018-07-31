import SwaggerExpress from 'swagger-express-mw';
import app from 'express';
import config from './config/environment';
import db from './config/db'; // eslint-disable-line no-unused-vars
import seedDB from './config/seed';
import path from 'path';

const server = app();

export const init = () => {
  const appConfig = {
    appRoot: __dirname, // required config
  };

  SwaggerExpress.create(appConfig, (err, swaggerExpress) => {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(server);
    server.get('/api/doc', (req, res) => {
      res.sendFile(path.join(__dirname + '/doc/api.html'));
    });
    server.listen(config.port);
  });
  seedDB();
};

export default server; // for testing
