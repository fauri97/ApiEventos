const http = require ('http');
const app = require('./eventApp');
const port = process.env.EVENT_PORT || 8081;
const server = http.createServer(app);

console.log("Servidor de eventos rodando na porta: ",port)

server.listen(port);