import mongoose from 'mongoose';
import bluebird from 'bluebird';

const connectDB = () => {
  mongoose.Promise = bluebird;

  const URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  return mongoose.connect(URI, err => {
    if (err) {
      console.log(`Can not connect to database at ${URI}!`);
    } else {
      console.log('Connect to database successfully!');
    }
  });
};

module.exports = connectDB;
