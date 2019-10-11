import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectFlash from 'connect-flash';
import passport from 'passport';
import ConnectDB from './config/connectDB';
import ConfigViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import configSession from './config/session';

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

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(
    `Server is running at ${process.env.APP_HOST} on ${process.env.APP_PORT}!`
  );
});
