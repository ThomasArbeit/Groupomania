const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Création d'un utilisateur
router.post('/signup', userCtrl.signup);

// Login d'un utilisateur
router.post('/login', userCtrl.login);

// Récupération de tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);

// Récupération d'un seul utilisateur
router.get('/users/:id', auth, userCtrl.getOneUser);

//Suppression d'un utilisateur
router.delete('/users/:id', userCtrl.deleteOneUser);

// Modification d'un utilisateur
router.post('/users/:id', userCtrl.modifyOneUser)

module.exports = router;