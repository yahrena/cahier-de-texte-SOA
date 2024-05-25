const db = require('../db');

class UeModel {

  static getAllUe(callback) {
    db.query('SELECT * FROM ue', callback);
  }

  static getUeById(id, callback) {
    db.query('SELECT * FROM ue WHERE idUe = ?', [id], callback);
  }

  static getUeByIdPromotion(id, callback) {
    db.query('SELECT * FROM ue WHERE idPromotion = ?', [id], callback);
  }

  static createUe(ue, callback) {
    db.query('INSERT INTO ue SET ?', [ue], callback);
  }

  static updateUe(id, ue, callback) {
    db.query('UPDATE ue SET ? WHERE idUe = ?', [ue, id], callback);
  }

  static deleteUe(id, callback) {
    db.query('DELETE FROM ue WHERE idUe = ?', [id], callback);
  }
}

module.exports = UeModel;
