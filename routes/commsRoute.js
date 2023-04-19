const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');


//get - endport: ./certificate/validade/:userId/:eventId
router.get('/validate/:userId/:eventId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const eventId = req.params.eventId;
        const certificate = await certificateController.getCertificate(userId, eventId);
        res.status(200).send(certificate);
    } catch (e) {
        next(e)
    }
})


module.exports = router;