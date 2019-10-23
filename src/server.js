import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectFlash from 'connect-flash';
import passport from 'passport';
import http from 'http';
import socketio from 'socket.io';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/connectDB';
import ConfigViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import session from './config/session';
import initSockets from './sockets/index';
import configSocketIo from './config/socketio';

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(morgan('dev'));

ConnectDB();

session.config(app);

ConfigViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectFlash());

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

configSocketIo(io, cookieParser, session);

initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(
    `Server is running at ${process.env.APP_HOST} on ${process.env.APP_PORT}!`
  );
});
