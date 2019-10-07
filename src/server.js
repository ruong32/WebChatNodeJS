import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectFlash from 'connect-flash';
import passport from 'passport';

import pem from 'pem';
import https from 'https';

import ConnectDB from './config/connectDB';
import ConfigViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import configSession from './config/session';

pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
  if (err) {
    throw err;
  }
  const app = express();

  app.use(morgan('dev'));

  ConnectDB();

  configSession(app);

  ConfigViewEngine(app);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(connectFlash());

  app.use(passport.initialize());
  app.use(passport.session());

  initRoutes(app);

  https
    .createServer({ key: keys.serviceKey, cert: keys.certificate }, app)
    .listen(process.env.APP_PORT, process.env.APP_HOST, () => {
      console.log(
        `Server is running at ${process.env.APP_HOST} on ${process.env.APP_PORT}!`
      );
    });
});

// const app = express();

// app.use(morgan('dev'));

// ConnectDB();

// configSession(app);

// ConfigViewEngine(app);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(connectFlash());

// app.use(passport.initialize());
// app.use(passport.session());

// initRoutes(app);

// app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
//   console.log(
//     `Server is running at ${process.env.APP_HOST} on ${process.env.APP_PORT}!`
//   );
// });
