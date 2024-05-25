const db = require('../db');

class NiveauModel {
  static getAllNiveaux(callback) {
    db.query('SELECT * FROM niveau', callback);
  }

  static getNiveauById(id, callback) {
    db.query('SELECT * FROM niveau WHERE idNiveau = ?', [id], callback);
  }

  static createNiveau(niveau, callback) {
    db.query('INSERT INTO niveau SET ?', [niveau], callback);
  }

  static updateNiveau(id, niveau, callback) {
    db.query('UPDATE niveau SET ? WHERE idNiveau = ?', [niveau, id], callback);
  }

  static deleteNiveau(id, callback) {
    db.query('DELETE FROM niveau WHERE idNiveau = ?', [id], callback);
  }
}

module.exports = NiveauModel;
