// routes/scolariteRoutes.js
const express = require('express');
const scolariteController = require('../controllers/scolariteController');

const router = express.Router();

// Routes CRUD pour les scolarités
router.get('/scolarites', scolariteController.getAllScolarites);
router.get('/scolarites/:id', scolariteController.getScolariteById);
router.post('/scolarites', scolariteController.createScolarite);
router.put('/scolarites/:id', scolariteController.updateScolarite);
router.delete('/scolarites/:id', scolariteController.deleteScolarite);

module.exports = router;
