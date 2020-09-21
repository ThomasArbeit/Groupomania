const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Création d'un post 
router.post('/create/:id' ,auth,  userCtrl.createOneComment);

// récupération des commentaires liés au Post
router.get('/:id', auth, userCtrl.getCommentsfromPost);


module.exports = router;