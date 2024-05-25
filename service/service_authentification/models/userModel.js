// models/userModel.js
const db = require('../db');

class UserModel {
    
    // Function to get all users
    getAllUsers(callback) {
        db.query('SELECT * FROM user', callback);
    }


    // Fonction pour récupérer un utilisateur par ID
    getUserById(userId, callback) {
        db.query('SELECT * FROM user WHERE idUser = ?', [userId], callback);
    }

    // Fonction pour récupérer un utilisateur par IDLogin
    getUserByLoginId(loginId, callback) {
        db.query('SELECT * FROM user WHERE idLogin = ?', [loginId], callback);
    }

    // Fonction pour créer un utilisateur
    createUser(userData, callback) {
        const { nomUser, prenomUser, mailUser, idLogin, idPromotion } = userData;
        const query = 'INSERT INTO user (nomUser, prenomUser, mailUser, idLogin, idPromotion) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [nomUser, prenomUser, mailUser, idLogin, idPromotion], callback);
    }

    // Fonction pour mettre à jour un utilisateur
    updateUser(userId, userData, callback) {
        const { nomUser, prenomUser, mailUser, idLogin, idPromotion } = userData;
        const query = 'UPDATE user SET nomUser=?, prenomUser=?, mailUser=?, idLogin=?, idPromotion=? WHERE idUser=?';

        db.query(query, [nomUser, prenomUser, mailUser, idLogin, idPromotion, userId], callback);
    }

    // Fonction pour supprimer un utilisateur
    deleteUser(userId, callback) {
        db.query('DELETE FROM user WHERE idUser = ?', [userId], callback);
    }
}

module.exports = new UserModel();
