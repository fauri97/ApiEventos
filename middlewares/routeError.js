//Reponde o erro para todas as rotas
exports.routeError = async function (req, res, next) {
    res.status(404).send('Desculpe, a rota solicitada não existe!');
};