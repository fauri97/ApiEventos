const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


//post - endpoint: ./event/

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

router.post('/registration', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const eventId = req.body.eventId;
        const eventUser = await eventController.registerUserOnEvent(eventId,userId);
        res.status(201).json(eventUser);
    } catch (e) {
        next(e);
    }
})


//post - endpoint ./event/checkin
router.post('/checkin', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const eventId = req.body.eventId;
        const eventUser = await eventController.registerCheckInOnEvent(eventId,userId);
        res.status(201).json(eventUser);
    } catch (e) {
        next(e);
    }
})




//get - endpoint ./event/

router.get("/", async (req, res, next) => {
    try {
        const events = await eventController.getEvents();
        res.status(200).json(events);
    } catch (e) {
        next(e);
    };
});


module.exports = router;