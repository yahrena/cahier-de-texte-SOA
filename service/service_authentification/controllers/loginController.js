// controllers/userController.js
const Login = require('../models/loginModel');
const bcrypt = require('bcrypt');

exports.createLogin = async (req, res) => {
  try {
      const login = new Login(req.body.login, req.body.password, req.body.type);

      login.save((error, insertedId) => {
          if (error) {
              console.error('Erreur lors de la création du login :', error);
              res.status(500).json({ error: 'Erreur lors de la création du login.' });
          } else {
              res.status(201).json({ id: insertedId });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création du login.' });
  }
};


exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
      // Récupérer l'utilisateur par le login depuis la base de données
      Login.findByLogin(login, async (err, user) => {
          if (err) {
              console.error('Erreur lors de la récupération de l\'utilisateur :', err);
              res.status(500).json({ error: 'Erreur du serveur' });
          } else if (!user.length) {
              res.status(400).json({ error: 'Utilisateur non trouvé' });
          } else {
              // Comparer les mots de passe
              const match = await bcrypt.compare(password, user[0].password);

              if (match) {
                  // res.status(200).json({ message: 'Connexion réussie' });
                  res.status(200).json(user[0]);
              } else {
                  res.status(401).json({ error: 'Mot de passe incorrect' });
              }
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

exports.getLoginById= (req, res) => {
  const { id } = req.params;
  Login.findById(id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'login non trouvée' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
},


exports.getAllLogin = (req, res) => {
    Login.findAll((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    });
  };
  

exports.updateLogin = async (req, res) => {
  try {
    const userData = req.body;

    // Si le mot de passe est fourni, hashons-le avant de le sauvegarder dans la base de données
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    await Login.update(req.params.id, userData);
    res.status(201).json({ message: 'Utilisateur mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de login.' });
  }
};

exports.deleteLogin = async (req, res) => {
  const { id } = req.params;
  Login.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Utilisateur supprimé avec succès.' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'login non trouvée' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });


};
