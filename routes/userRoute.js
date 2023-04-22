const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//post - endpoint: ./user/
//Cria um usuario
router.post("/", async (req,res,next) => {
    try{
        //Cria um objeto user que recebeu do corpo da requisição e envia para classe userController para cadastrar um novo usuario
        //depois de cadastrar o novo usuario o retorna para o front
        const user = req.body
        const newUser = await userController.saveUser(user);
        res.status(201).json(newUser);
    }catch (e){
        next(e);
    };
});

//post - endpoint: ./user/login
//Autentica um usuario
router.post("/login", async (req,res,next) => {
    try{
        //cria o objeto user que recebeu do corpo da requisição e envia para a classe userController na função login, espera o usuario com um token
        //para enviar para o front
        const user = req.body
        const newUser = await userController.login(user);
        res.status(201).json(newUser);
    }catch (e){
        next(e);
    };
});

//post - endpoint: ./user/logout
//Desloga um usuario
router.post("/logout", async (req,res,next) => {
    try{
        //Envia o token que recebeu no header da requisição para classe userController na função de logout e espera uma mensagem de volta no formato json
        const message = await userController.logout(req.headers.authorization);
        res.status(201).json(message);
    }catch (e){
        next(e);
    };
});

module.exports = router;