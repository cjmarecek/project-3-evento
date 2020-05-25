const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const events = require('./api/events');
const authentication = require('./api/authentication');

const app = express();
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
//in the browser request only from that origin can ask for a request
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use('/authenticate', authentication);
app.use('/api/events', events);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
