const express = require('express');
const router = express.Router();
const CoursController = require('../controllers/coursController');

// Récupère tous les cours
router.get('/cours', CoursController.getAllCours);

// Récupère un cours par ID
router.get('/cours/:id', CoursController.getCoursById);

// Crée un nouveau cours
router.post('/cours', CoursController.createCours);

// Met à jour un cours par ID
router.put('/cours/:id', CoursController.updateCours);

// Supprime un cours par ID
router.delete('/cours/:id', CoursController.deleteCours);

module.exports = router;
