const ParcoursModel = require('../models/parcoursModel');

const ParcoursController = {
  getAllParcours: (req, res) => {
    ParcoursModel.getAllParcours((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getParcoursById: (req, res) => {
    const { id } = req.params;
    ParcoursModel.getParcoursById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Parcours non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  createParcours: (req, res) => {
    const { libelle } = req.body;
    const parcours = { libelle };
    ParcoursModel.createParcours(parcours, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Parcours créé avec succès', id: result.insertId });
      }
    });
  },

  updateParcours: (req, res) => {
    const { id } = req.params;
    const { libelle } = req.body;
    const parcours = { libelle };
    ParcoursModel.updateParcours(id, parcours, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Parcours non trouvé' });
        } else {
          res.status(200).json({ message: 'Parcours mis à jour avec succès' });
        }
      }
    });
  },

  deleteParcours: (req, res) => {
    const { id } = req.params;
    ParcoursModel.deleteParcours(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Parcours non trouvé' });
        } else {
          res.status(200).json({ message: 'Parcours supprimé avec succès' });
        }
      }
    });
  }
};

module.exports = ParcoursController;
