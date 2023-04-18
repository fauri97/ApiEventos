const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
  write: (message) => logger.http(message),
};

//verifica se o processo está em "development" caso sim, ele exibira todos os tipos de logs, caso não estejá ele exibira somente os http, erros e warns
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};


//gerencia os logs dos Microserviços
const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;