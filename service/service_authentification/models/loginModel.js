// models/User.js
const bcrypt = require('bcrypt');
const db = require('../db');

class Login {
  constructor(login, password, type) {
    
    this.login = login;
    this.password = password;
    this.type = type;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async save(callback) {
    await this.hashPassword();
        const query = 'INSERT INTO login (login, password, type) VALUES (?, ?, ?)';

        try {
            // Utilisation de la promesse retournée par queryPromise
            const result = await db.queryPromise(query, [this.login, this.password, this.type]);

            // Renvoie l'ID inséré
            callback(null, result.insertId);
        } catch (error) {
            callback(error);
        }
  }

  static findByLogin(login,callback) {
    return db.query('SELECT * FROM login WHERE login = ?', [login],callback);
  }


  static findById(id,callback) {
    return db.query('SELECT * FROM login WHERE 	idLogin = ?',[id],callback);
  }

  static findAll(callback) {
    return db.query('SELECT * FROM login',callback);
  }

  static update(id, data) {
    return db.query('UPDATE login SET ? WHERE 	idLogin = ?', [data, id]);
  }

  static delete(id, callback) {
    return db.query('DELETE FROM login WHERE 	idLogin = ?', [id], callback);
  }
}

module.exports = Login;
