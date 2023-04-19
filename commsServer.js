const http = require ('http');
const app = require('./commsApp');
const port = process.env.COMMS_PORT || 8082;
const server = http.createServer(app);

console.log("Servidor de comunicação rodando na porta: ",port)

server.listen(port);