const express = require('express');
const router = express.Router();
const ParcoursController = require('../controllers/parcoursController');

// Récupère tous les parcours
router.get('/parcours', ParcoursController.getAllParcours);

// Récupère un parcours par ID
router.get('/parcours/:id', ParcoursController.getParcoursById);

// Crée un nouveau parcours
router.post('/parcours', ParcoursController.createParcours);

// Met à jour un parcours par ID
router.put('/parcours/:id', ParcoursController.updateParcours);

// Supprime un parcours par ID
router.delete('/parcours/:id', ParcoursController.deleteParcours);

module.exports = router;
