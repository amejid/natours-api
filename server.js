const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  // eslint-disable-next-line no-use-before-define
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
