const PromotionModel = require('../models/promotionModel');

const PromotionController = {
  getAllPromotions: (req, res) => {
    PromotionModel.getAllPromotions((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getPromotionById: (req, res) => {
    const { id } = req.params;
    PromotionModel.getPromotionById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Promotion non trouvée' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },


  createPromotion: (req, res) => {
    const { idNiveau, idParcours, annéeUniv, libelle } = req.body;
    const promotion = { idNiveau, idParcours, annéeUniv, libelle };
    PromotionModel.createPromotion(promotion, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Promotion créée avec succès', id: result.insertId });
      }
    });
  },

  updatePromotion: (req, res) => {
    const { id } = req.params;
    const { idNiveau, idParcours, annéeUniv, libelle } = req.body;
    const promotion = { idNiveau, idParcours, annéeUniv, libelle };
    PromotionModel.updatePromotion(id, promotion, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Promotion non trouvée' });
        } else {
          res.status(200).json({ message: 'Promotion mise à jour avec succès' });
        }
      }
    });
  },

  deletePromotion: (req, res) => {
    const { id } = req.params;
    PromotionModel.deletePromotion(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Promotion non trouvée' });
        } else {
          res.status(200).json({ message: 'Promotion supprimée avec succès' });
        }
      }
    });
  }
};

module.exports = PromotionController;
