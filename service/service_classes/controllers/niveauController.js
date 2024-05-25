const NiveauModel = require('../models/niveauModel');

const NiveauController = {
  getAllNiveaux: (req, res) => {
    NiveauModel.getAllNiveaux((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getNiveauById: (req, res) => {
    const { id } = req.params;
    NiveauModel.getNiveauById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Niveau non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  createNiveau: (req, res) => {
    const { libelle } = req.body;
    const niveau = { libelle };
    NiveauModel.createNiveau(niveau, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Niveau créé avec succès', id: result.insertId });
      }
    });
  },

  updateNiveau: (req, res) => {
    const { id } = req.params;
    const { libelle } = req.body;
    const niveau = { libelle };
    NiveauModel.updateNiveau(id, niveau, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Niveau non trouvé' });
        } else {
          res.status(200).json({ message: 'Niveau mis à jour avec succès' });
        }
      }
    });
  },

  deleteNiveau: (req, res) => {
    const { id } = req.params;
    NiveauModel.deleteNiveau(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Niveau non trouvé' });
        } else {
          res.status(200).json({ message: 'Niveau supprimé avec succès' });
        }
      }
    });
  }
};

module.exports = NiveauController;
