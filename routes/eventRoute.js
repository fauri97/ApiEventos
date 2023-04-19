const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


//post - endpoint: ./event/
//Cadastra um evento
router.post("/", async (req, res, next) => {
    try {
        const event = req.body
        const newEvent = await eventController.saveEvent(event);
        res.status(201).json(newEvent);
    } catch (e) {
        next(e);
    };
});


//post - endpoint ./event/registration
//Cadastra um usuario em um evento
router.post('/registration', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const eventId = req.body.eventId;
        const eventUser = await eventController.registerUserOnEvent(eventId, userId);
        res.status(201).json(eventUser);
    } catch (e) {
        next(e);
    }
})


//post - endpoint ./event/checkin
//Registra que o usuario compareceu no evento
router.post('/checkin', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const eventId = req.body.eventId;
        const eventUser = await eventController.registerCheckInOnEvent(eventId, userId);
        res.status(201).json(eventUser);
    } catch (e) {
        next(e);
    }
})




//get - endpoint ./event/
//Retorna todos os eventos
router.get("/", async (req, res, next) => {
    try {
        const events = await eventController.getEvents();
        res.status(200).json(events);
    } catch (e) {
        next(e);
    };
});

//get - endpoint ./event/user/:userId
//Retorna todos os eventos que determinado usuario está inscrito
router.get("/user/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const events = await eventController.getEventsOfUser(userId);
        res.status(200).json(events);
    } catch (e) {
        next(e);
    };
});



//delete - endpoint ./registration/:userId/:eventId
//Retira a inscrição de um usuario em um evento
router.delete("/registration/:userId/:eventId", async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const eventId = req.params.eventId;
        const eventUser = await eventController.unregisterUserFromEvent(eventId, userId);
        res.status(202).json(eventUser)
    } catch (e){
        next(e);
    }
})

module.exports = router;