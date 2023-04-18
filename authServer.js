const http = require ('http');
const app = require('./authApp');
const port = process.env.AUTH_PORT || 8080;
const server = http.createServer(app);

console.log("Server de autenticação rodando na porta: ",port)

server.listen(port);