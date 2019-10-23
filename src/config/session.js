import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const sessionStore = new MongoStore({
  url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  autoReconnect: true
  // autoRemove: "native"
});

const config = app => {
  app.use(
    session({
      key: 'express.sid',
      secret: 'mySecret',
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    })
  );
};

module.exports = {
  config: config,
  sessionStore: sessionStore
};
