const CoursModel = require('../models/coursModel');

const CoursController = {
  getAllCours: (req, res) => {
    CoursModel.getAllCours((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getCoursById: (req, res) => {
    const { id } = req.params;
    CoursModel.getCoursById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Cours non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  createCours: (req, res) => {
    const { idEnseignant, libelle, horaire, commentaire } = req.body;
    const cours = { idEnseignant, libelle, horaire, commentaire };
    CoursModel.createCours(cours, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Cours créé avec succès', id: result.insertId });
      }
    });
  },

  updateCours: (req, res) => {
    const { id } = req.params;
    const { idEnseignant, libelle, horaire, commentaire } = req.body;
    const cours = { idEnseignant, libelle, horaire, commentaire };
    CoursModel.updateCours(id, cours, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Cours non trouvé' });
        } else {
          res.status(200).json({ message: 'Cours mis à jour avec succès' });
        }
      }
    });
  },

  deleteCours: (req, res) => {
    const { id } = req.params;
    CoursModel.deleteCours(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Cours non trouvé' });
        } else {
          res.status(200).json({ message: 'Cours supprimé avec succès' });
        }
      }
    });
  }
};

module.exports = CoursController;
