const UeModel = require('../models/ueModel');

const UeController = {

  // Function to get all users
  getAllUe(req, res) {
    UeModel.getAllUe((err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des ues :', err);
        res.status(500).send('Erreur du serveur');
      } else {
        res.json(result);
      }
    });
  },

  getUeById: (req, res) => {
    const { id } = req.params;
    UeModel.getUeById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'UE non trouvée' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  getUeByIdPromotion: (req, res) => {
    const { idPromotion } = req.params;
    UeModel.getUeByIdPromotion(idPromotion, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  createUe: (req, res) => {
    const { idCours, idPromotion, libelle, credit, commentaire } = req.body;
    const ue = { idCours, idPromotion, libelle, credit, commentaire };
    UeModel.createUe(ue, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'UE créée avec succès', id: result.insertId });
      }
    });
  },

  updateUe: (req, res) => {
    const { id } = req.params;
    const { idCours, idPromotion, libelle, credit, commentaire } = req.body;
    const ue = { idCours, idPromotion, libelle, credit, commentaire };
    UeModel.updateUe(id, ue, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'UE non trouvée' });
        } else {
          res.status(200).json({ message: 'UE mise à jour avec succès' });
        }
      }
    });
  },

  deleteUe: (req, res) => {
    const { id } = req.params;
    UeModel.deleteUe(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'UE non trouvée' });
        } else {
          res.status(200).json({ message: 'UE supprimée avec succès' });
        }
      }
    });
  }
};

module.exports = UeController;
