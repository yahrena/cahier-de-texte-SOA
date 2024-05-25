// models/scolariteModel.js
const db = require('../db');

class ScolariteModel {
    getAllScolarites(callback) {
        db.query('SELECT * FROM scolarite', callback);
    }

    getScolariteById(idSco, callback) {
        db.query('SELECT * FROM scolarite WHERE idSco = ?', [idSco], callback);
    }

    createScolarite(scolariteData, callback) {
        const { nomSco, prenomSco, mailSco, idLogin } = scolariteData;
        const query = 'INSERT INTO scolarite (nomSco, prenomSco, mailSco, idLogin) VALUES (?, ?, ?, ?)';

        db.query(query, [nomSco, prenomSco, mailSco, idLogin], callback);
    }

    updateScolarite(idSco, scolariteData, callback) {
        const { nomSco, prenomSco, mailSco, idLogin } = scolariteData;
        const query = 'UPDATE scolarite SET nomSco=?, prenomSco=?, mailSco=?, idLogin=? WHERE idSco=?';

        db.query(query, [nomSco, prenomSco, mailSco, idLogin, idSco], callback);
    }

    deleteScolarite(idSco, callback) {
        db.query('DELETE FROM scolarite, Login WHERE Login.idLogin = Scolarite.idLogin AND idSco = ?', [idSco], callback);
    }
}

module.exports = new ScolariteModel();
