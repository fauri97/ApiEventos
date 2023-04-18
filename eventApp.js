const express = require('express');
const app = express();
const cors = require("cors");
const authorization = require('./middlewares/authorization').validarToken;
const errorHandler = require('./middlewares/errorHandler').errorHandler;
const routeError = require("./middlewares/routeError").routeError;
const morganMiddleware = require("./middlewares/morgan.middleware");
const eventRoute = require('./routes/eventRoute');



//middlewares
app.options('*', cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(authorization);

//routes
app.use('/event', eventRoute);

//on error
app.use(routeError);
app.use(errorHandler);

module.exports = app