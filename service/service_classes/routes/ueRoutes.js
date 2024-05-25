const express = require('express');
const router = express.Router();
const UeController = require('../controllers/ueController');

//Toutes les Ues
router.get('/ues', UeController.getAllUe)

// Récupère une UE par ID
router.get('/ues/:id', UeController.getUeById);

// Récupère une UE par IDPromotion
router.get('/ues/uesByIdPromotion/:idPromotion', UeController.getUeByIdPromotion);

// Crée une nouvelle UE
router.post('/ues', UeController.createUe);

// Met à jour une UE par ID
router.put('/ues/:id', UeController.updateUe);

// Supprime une UE par ID
router.delete('/ues/:id', UeController.deleteUe);

module.exports = router;
