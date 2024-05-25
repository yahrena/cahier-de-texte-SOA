const express = require('express');
const router = express.Router();
const CahierTxtController = require('../controllers/cahierTxtController');


// Récupère un cahierTxt par ID
router.get('/cahiersTxt/', CahierTxtController.getCahierTxt);

// Récupère un cahierTxt par ID
router.get('/cahiersTxt/:id', CahierTxtController.getCahierTxtById);

// Crée un nouveau cahierTxt
router.post('/cahiersTxt', CahierTxtController.createCahierTxt);

// Met à jour un cahierTxt par ID
router.put('/cahiersTxt/:id', CahierTxtController.updateCahierTxt);

// Supprime un cahierTxt par ID
router.delete('/cahiersTxt/:id', CahierTxtController.deleteCahierTxt);

module.exports = router;
