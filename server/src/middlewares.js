const jwt = require('jsonwebtoken');

const checkAuth = (req,  res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
    req.userData = decoded;
    next()
  } catch (error) {
    res.status(401).json({ message: "Auth Failed"})
  }
}

// not found, general one middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error middleware, for any other error there
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'developement' : error.stack,
  });
};



module.exports = {
  notFound,
  errorHandler,
  checkAuth
};
