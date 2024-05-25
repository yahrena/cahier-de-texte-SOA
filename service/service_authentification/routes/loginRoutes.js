// routes/userRoutes.js
const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', loginController.createLogin);
router.get('/login/:id', loginController.getLoginById);
router.get('/login', loginController.getAllLogin);
router.put('/login/:id', loginController.updateLogin);
router.delete('/login/:id', loginController.deleteLogin);
router.post('/connect', loginController.login);

module.exports = router;