const express = require('express');
const app = express();
const cors = require("cors");
const authorization = require('./middlewares/authorization').validarToken;
const errorHandler = require('./middlewares/errorHandler').errorHandler;
const routeError = require("./middlewares/routeError").routeError;
const morganMiddleware = require("./middlewares/morgan.middleware");
const commsRoute = require('./routes/commsRoute');
const emailRoute = require ('./routes/emailRoute')



//middlewares
app.options('*', cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(authorization);

//routes
app.use('/certificate', commsRoute);
//app.use('/email', emailRoute)

//on error
app.use(routeError);
app.use(errorHandler);

module.exports = app