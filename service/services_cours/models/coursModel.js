const db = require('../db');

class CoursModel {
  static getAllCours(callback) {
    db.query('SELECT * FROM cours;', callback);
  }

  static getCoursById(id, callback) {
    db.query('SELECT * FROM cours WHERE idCours = ?', [id], callback);
  }

  static createCours(cours, callback) {
    db.query('INSERT INTO cours SET ?', [cours], callback);
  }

  static updateCours(id, cours, callback) {
    db.query('UPDATE cours SET ? WHERE idCours = ?', [cours, id], callback);
  }

  static deleteCours(id, callback) {
    db.query('DELETE FROM cours WHERE idCours = ?', [id], callback);
  }
}

module.exports = CoursModel;
