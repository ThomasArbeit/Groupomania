const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// Récupération de tous les posts 
router.get('/', auth, userCtrl.getAllPosts);

// récupération d'un post 
router.get('/:id', auth, userCtrl.getOnePost);

// Création d'un post 
router.post('/create' ,auth, multer,  userCtrl.createOnePost);

// Suppression d'un post 
router.delete('/:id' , auth,  userCtrl.deleteOnePost);

// Modification d'un post 
router.post('/:id' , multer,  userCtrl.modifyOnePost);

// Gestion des likes
router.put('/:id' , auth,  userCtrl.Likes);





module.exports = router;