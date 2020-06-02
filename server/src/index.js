const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override")

const middlewares = require("./middlewares");
const events = require("./api/events");
const authentication = require("./api/authentication");
const app = express();

//middleware
app.use(methodOverride("_method"));
app.use(morgan("common"));
app.use(helmet());
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());  

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use("/authenticate", authentication);
app.use("/api/events", events);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
