const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/comment');
const authComm = require('../middleware/authComm')
const auth = require('../middleware/auth');

// Création d'un post 
router.post('/create/:id' ,auth,  userCtrl.createOneComment);

// récupération des commentaires liés au Post
router.get('/:id', auth, userCtrl.getCommentsfromPost);

// Suppression d'un commentaire 
router.delete('/:id', auth, authComm, userCtrl.deleteOneComment);

// Modification d'un commentaire
router.post('/:id', auth, authComm, userCtrl.modifyOneComment);

module.exports = router;