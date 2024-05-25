// controllers/scolariteController.js
const scolariteModel = require('../models/scolariteModel');

class ScolariteController {
    getAllScolarites(req, res) {
        scolariteModel.getAllScolarites((err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des scolarités :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.json(results);
            }
        });
    }

    getScolariteById(req, res) {
        const idSco = req.params.id;
        scolariteModel.getScolariteById(idSco, (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération de la scolarité :', err);
                res.status(500).send('Erreur du serveur');
            } else if (!result.length) {
                res.status(404).send('Scolarité non trouvée');
            } else {
                res.json(result[0]);
            }
        });
    }

    createScolarite(req, res) {
        const scolariteData = req.body;
        scolariteModel.createScolarite(scolariteData, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création de la scolarité :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.status(201).json({ message: 'Responsable créée avec succès', idSco: result.insertId, ...scolariteData });
                // res.json({ idSco: result.insertId, ...scolariteData });
            }
        });
    }

    updateScolarite(req, res) {
        const idSco = req.params.id;
        const scolariteData = req.body;
        scolariteModel.updateScolarite(idSco, scolariteData, (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la scolarité :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.status(201).send('Scolarité mise à jour avec succès');
            }
        });
    }

    deleteScolarite(req, res) {
        const idSco = req.params.id;
        scolariteModel.deleteScolarite(idSco, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression de la scolarité :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.status(200).send('Scolarité supprimée avec succès');
            }
        });
    }
}

module.exports = new ScolariteController();
