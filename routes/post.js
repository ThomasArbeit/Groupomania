const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authPost = require('../middleware/authPost')
const multer = require('../middleware/multer-config')

// Récupération de tous les posts 
router.get('/', auth, userCtrl.getAllPosts);

// récupération d'un post 
router.get('/:id', auth, userCtrl.getOnePost);

// Création d'un post 
router.post('/create' ,auth, multer,  userCtrl.createOnePost);

// Suppression d'un post 
router.delete('/:id' , auth, authPost,  userCtrl.deleteOnePost);

// Modification d'un post 
router.post('/:id' ,auth, multer, authPost, userCtrl.modifyOnePost);







module.exports = router;