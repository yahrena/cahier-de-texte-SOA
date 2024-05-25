const EnseignantModel = require('../models/enseignantModel');

const EnseignantController = {
  getAllEnseignants: (req, res) => {
    EnseignantModel.getAllEnseignants((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getEnseignantById: (req, res) => {
    const { id } = req.params;
    EnseignantModel.getEnseignantById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Enseignant non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  createEnseignant: (req, res) => {
    const { nom, prenom, tel, mail,idlogin } = req.body;
    const enseignant = { nom, prenom, tel, mail,idlogin };
    EnseignantModel.createEnseignant(enseignant, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Enseignant créé avec succès', id: result.insertId });
      }
    });
  },

  updateEnseignant: (req, res) => {
    const { id } = req.params;
    const { nom, prenom, tel, mail } = req.body;
    const enseignant = { nom, prenom, tel, mail };
    EnseignantModel.updateEnseignant(id, enseignant, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Enseignant non trouvé' });
        } else {
          res.status(200).json({ message: 'Enseignant mis à jour avec succès' });
        }
      }
    });
  },

  deleteEnseignant: (req, res) => {
    const { id } = req.params;
    EnseignantModel.deleteEnseignant(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Enseignant non trouvé' });
        } else {
          res.status(200).json({ message: 'Enseignant supprimé avec succès' });
        }
      }
    });
  }
};

module.exports = EnseignantController;


