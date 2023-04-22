const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');


//get - endport: ./certificate/validate/:userId/:eventId
router.get('/validate/:userId/:eventId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const eventId = req.params.eventId;
        const certificate = await certificateController.getCertificate(userId, eventId);
        res.status(200).send(certificate);
    } catch (e) {
        next(e)
    }
});


//get - endport: ./certificate/:userId
router.get('/:userId', async (req, res, next) => {
  try{
    const userId = req.params.userId
    const certificates = await certificateController.getAllCertificatesOfAUser(userId);
    res.status(200).send(certificates);
  } catch(e){
    next(e);
  }
});



//get -  Endpoint: ./certificate/generate-pdf/:userId/:eventId
router.get('/generate-pdf/:userId/:eventId', async (req, res) => {
    const userId = req.params.userId;
    const eventId = req.params.eventId;
  
    try {
      const pdf = await certificateController.generatePDF(userId, eventId);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=certificado.pdf');
  
      res.send(pdf);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocorreu um erro ao gerar o certificado');
    }
  });
  



module.exports = router;