const CahierTxtModel = require('../models/cahierTxtModel');

const CahierTxtController = {
 

  getCahierTxt: (req, res) => {
    const { id } = req.params;
    CahierTxtModel.getCahierTxt((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getCahierTxtById: (req, res) => {
    const { id } = req.params;
    CahierTxtModel.getCahierTxtById(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'CahierTxt non trouvé' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  },

  createCahierTxt: (req, res) => {
    const { idUe,chapitre, paragraphe,date,heureDeb,heureFin, commentaire } = req.body;
    const cahierTxt = {idUe,chapitre, paragraphe,date,heureDeb,heureFin, commentaire};
    CahierTxtModel.createCahierTxt(cahierTxt, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'CahierTxt créé avec succès', id: result.insertId });
      }
    });
  },

  updateCahierTxt: (req, res) => {
    const { id } = req.params;
    const { idUe,chapitre, paragraphe,date,heureDeb,heureFin, commentaire } = req.body;
    const cahierTxt = {idUe,chapitre, paragraphe,date,heureDeb,heureFin, commentaire};
    CahierTxtModel.updateCahierTxt(id, cahierTxt, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'CahierTxt non trouvé' });
        } else {
          res.status(200).json({ message: 'CahierTxt mis à jour avec succès' });
        }
      }
    });
  },

  deleteCahierTxt: (req, res) => {
    const { id } = req.params;
    CahierTxtModel.deleteCahierTxt(id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'CahierTxt non trouvé' });
        } else {
          res.status(200).json({ message: 'CahierTxt supprimé avec succès' });
        }
      }
    });
  }
};

module.exports = CahierTxtController;
