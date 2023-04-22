require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");

const blockedTokensFile = "blocked_tokens.json";
let blockedTokens = [];

// Lê os tokens bloqueados do arquivo JSON
fs.readFile(blockedTokensFile, "utf8", (err, data) => {
  if (!err) {
    blockedTokens = JSON.parse(data);
  }
});

// Salva os tokens bloqueados no arquivo JSON
function saveBlockedTokens() {
  fs.writeFile(blockedTokensFile, JSON.stringify(blockedTokens), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

//VALIDA OS TOKENS DE USUARIO LOGADO
exports.validarToken = function (req, res, next) {
  const pathRegexGenerate = /^\/certificate\/generate-pdf\/\d+\/\d+$/;
  const pathRegexValidate = /^\/certificate\/validate\/\d+\/\d+$/;
  //VERIFICA SE A REQUISIÇÃO É POST
  if (req.method === "POST" && req.path === "/user") {
    return next();
  }
  if (req.method === "POST" && req.path === "/user/login") {
    return next();
  }
  if (req.method === "POST" && req.path === "/user/logout") {
    return next();
  }
  if (req.method === "GET" && pathRegexGenerate.test(req.path)) {
    return next();
  }
  if (req.method === "GET" && pathRegexValidate.test(req.path)) {
    return next();
  }

  const token = req.headers.authorization;

  //VERIFICA SE RECEBEU O TOKEN
  if (!token) {
    return res.status(401).send({ mensagem: "Token não fornecido." });
  }
  const split = token.split(" ");

  //VERIFICA SE O TOKEN É VALIDO
  jwt.verify(
    split[1],
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).send({ mensagem: "Token inválido." });
      }
      if (blockedTokens.includes(token)) {
        return res.status(401).send({ mensagem: "Token na lista negra." });
      }
      next();
    }
  );
};

//Adiciona o token a blacklist
exports.blockToken = function (token) {
  blockedTokens.push(token);
  saveBlockedTokens();
};