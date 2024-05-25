const express = require('express');
const router = express.Router();
const EnseignantController = require('../controllers/enseignantController');

// Récupère tous les enseignants
router.get('/enseignants', EnseignantController.getAllEnseignants);

// Récupère un enseignant par ID
router.get('/enseignants/:id', EnseignantController.getEnseignantById);

// Crée un nouvel enseignant
router.post('/enseignants', EnseignantController.createEnseignant);

// Met à jour un enseignant par ID
router.put('/enseignants/:id', EnseignantController.updateEnseignant);

// Supprime un enseignant par ID
router.delete('/enseignants/:id', EnseignantController.deleteEnseignant);

module.exports = router;
