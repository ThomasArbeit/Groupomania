const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');

// Création d'un utilisateur
router.post('/signup', userCtrl.signup);

// Login d'un utilisateur
router.post('/login', userCtrl.login);

// Récupération d'un seul utilisateur
router.get('/users/:id', auth, authUser, userCtrl.getOneUser);

//Suppression d'un utilisateur
router.delete('/users/:id', auth, authUser, userCtrl.deleteOneUser);

// Modification d'un utilisateur
router.post('/users/:id', auth, authUser, userCtrl.modifyOneUser)

// Vérification de l'utilisateur avec le token
router.get('/auth', auth , userCtrl.authenticate);

module.exports = router;