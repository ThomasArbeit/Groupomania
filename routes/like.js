const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// Création d'un like 
router.post('/:id' ,auth,  userCtrl.createOneLike);

// Suppression d'un like 
router.post('/delete/:id' ,auth,  userCtrl.deleteOneLike);

// récupération des commentaires liés au Post
router.get('/:id', auth, userCtrl.getLikesfromPost);


module.exports = router;