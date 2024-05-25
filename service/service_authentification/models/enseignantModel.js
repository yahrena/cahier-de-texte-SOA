const db = require('../db');

class EnseignantModel {
  static getAllEnseignants(callback) {
    db.query('SELECT * FROM enseignant', callback);
  }

  static getEnseignantById(id, callback) {
    db.query('SELECT * FROM enseignant WHERE idEnseignant = ?', [id], callback);
  }

  static createEnseignant(enseignant, callback) {
    db.query('INSERT INTO enseignant SET ?', [enseignant], callback);
  }

  static updateEnseignant(id, enseignant, callback) {
    db.query('UPDATE enseignant SET ? WHERE idEnseignant = ?', [enseignant, id], callback);
  }

  static deleteEnseignant(id, callback) {
    db.query('DELETE FROM enseignant WHERE idEnseignant = ?', [id], callback);
  }
}

module.exports = EnseignantModel;
