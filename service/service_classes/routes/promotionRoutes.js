const express = require('express');
const router = express.Router();
const PromotionController = require('../controllers/promotionController');

// Récupère toutes les promotions
router.get('/promotions', PromotionController.getAllPromotions);

// Récupère une promotion par ID
router.get('/promotions/:id', PromotionController.getPromotionById);

// Crée une nouvelle promotion
router.post('/promotions', PromotionController.createPromotion);

// Met à jour une promotion par ID
router.put('/promotions/:id', PromotionController.updatePromotion);

// Supprime une promotion par ID
router.delete('/promotions/:id', PromotionController.deletePromotion);

module.exports = router;
