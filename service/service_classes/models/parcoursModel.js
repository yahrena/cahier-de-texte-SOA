const db = require('../db');

class ParcoursModel {
  static getAllParcours(callback) {
    db.query('SELECT * FROM parcours', callback);
  }

  static getParcoursById(id, callback) {
    db.query('SELECT * FROM parcours WHERE idParcours = ?', [id], callback);
  }

  static createParcours(parcours, callback) {
    db.query('INSERT INTO parcours SET ?', [parcours], callback);
  }

  static updateParcours(id, parcours, callback) {
    db.query('UPDATE parcours SET ? WHERE idParcours = ?', [parcours, id], callback);
  }

  static deleteParcours(id, callback) {
    db.query('DELETE FROM parcours WHERE idParcours = ?', [id], callback);
  }
}

module.exports = ParcoursModel;
