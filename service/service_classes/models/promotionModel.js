const db = require('../db');

class PromotionModel {

  static getAllPromotions(callback) {
    db.query('SELECT * FROM promotion', callback);
  }

  static getPromotionById(id, callback) {
    db.query('SELECT * FROM promotion WHERE idPromotion = ?', [id], callback);
  }

  static createPromotion(promotion, callback) {
    db.query('INSERT INTO promotion SET ?', [promotion], callback);
  }

  static updatePromotion(id, promotion, callback) {
    db.query('UPDATE promotion SET ? WHERE idPromotion = ?', [promotion, id], callback);
  }

  static deletePromotion(id, callback) {
    db.query('DELETE FROM promotion WHERE idPromotion = ?', [id], callback);
  }
}

module.exports = PromotionModel;
