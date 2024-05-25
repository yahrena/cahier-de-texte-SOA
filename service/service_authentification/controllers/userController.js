// controllers/userController.js
const userModel = require('../models/userModel');

class UserController {
    
    // Function to get all users
    getAllUsers(req, res) {
        userModel.getAllUsers((err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération des utilisateurs :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.json(result);
            }
        });
    }

    // Fonction pour récupérer un utilisateur par ID
    getUserById(req, res) {
        const userId = req.params.id;
        userModel.getUserById(userId, (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', err);
                res.status(500).send('Erreur du serveur');
            } else if (!result.length) {
                res.status(404).send('Utilisateur non trouvé');
            } else {
                res.json(result[0]);
            }
        });
    }

    // Fonction pour récupérer un utilisateur par IDLogin
    getUserByLoginId(req, res) {
        const loginId = req.params.id;
        userModel.getUserByLoginId(loginId, (err, result) => {
            if (err) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', err);
                res.status(500).send('Erreur du serveur');
            } else if (!result.length) {
                res.status(404).send('Utilisateur non trouvé');
            } else {
                res.json(result[0]);
            }
        });
    }

    // Fonction pour créer un utilisateur
    createUser(req, res) {
        const userData = req.body;
        userModel.createUser(userData, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création de l\'utilisateur :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.status(201).json({ message: 'Eleve créée avec succès', idUser: result.insertId, ...userData });
                // res.json({ idUser: result.insertId, ...userData });
            }
        });
    }

    // Fonction pour mettre à jour un utilisateur
    updateUser(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        userModel.updateUser(userId, userData, (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.send('Utilisateur mis à jour avec succès');
            }
        });
    }

    // Fonction pour supprimer un utilisateur
    deleteUser(req, res) {
        const userId = req.params.id;
        userModel.deleteUser(userId, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', err);
                res.status(500).send('Erreur du serveur');
            } else {
                res.send('Utilisateur supprimé avec succès');
            }
        });
    }
}

module.exports = new UserController();
