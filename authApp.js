const express = require('express');
const app = express();
const cors = require("cors");
const authorization = require('./middlewares/authorization').validarToken;
const errorHandler = require('./middlewares/errorHandler').errorHandler
const routeError = require("./middlewares/routeError").routeError;
const morganMiddleware = require("./middlewares/morgan.middleware");
const routeUser = require('./routes/userRoute');



//middlewares
app.options('*', cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(authorization);

//routes
app.use('/user', routeUser);

//on error
app.use(routeError);
app.use(errorHandler);

module.exports = app