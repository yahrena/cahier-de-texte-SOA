const express = require('express');
const router = express.Router();
const NiveauController = require('../controllers/niveauController');

// Récupère tous les niveaux
router.get('/niveaux', NiveauController.getAllNiveaux);

// Récupère un niveau par ID
router.get('/niveaux/:id', NiveauController.getNiveauById);

// Crée un nouveau niveau
router.post('/niveaux', NiveauController.createNiveau);

// Met à jour un niveau par ID
router.put('/niveaux/:id', NiveauController.updateNiveau);

// Supprime un niveau par ID
router.delete('/niveaux/:id', NiveauController.deleteNiveau);

module.exports = router;
