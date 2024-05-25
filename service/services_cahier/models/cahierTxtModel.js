const db = require('../db');

class CahierTxtModel {
  
  static getCahierTxt(callback) {
    db.query('SELECT * FROM cahiertxt', callback);
  }

  static getCahierTxtById(id, callback) {
    db.query('SELECT * FROM cahiertxt WHERE idCahierTxt = ?', [id], callback);
  }

  static createCahierTxt(cahierTxt, callback) {
    db.query('INSERT INTO cahiertxt SET ?', [cahierTxt], callback);
  }

  static updateCahierTxt(id, cahierTxt, callback) {
    db.query('UPDATE cahiertxt SET ? WHERE idCahierTxt = ?', [cahierTxt, id], callback);
  }

  static deleteCahierTxt(id, callback) {
    db.query('DELETE FROM cahiertxt WHERE idCahierTxt = ?', [id], callback);
  }
}

module.exports = CahierTxtModel;
