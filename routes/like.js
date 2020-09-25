const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// Modération des likes
router.put('/:id', auth, userCtrl.moderateLikes)

// récupération des likes liés au Post
router.get('/:id', auth, userCtrl.getLikesfromPost);

// récupération du like de l'userId lié au Post
router.post('/:id', auth, userCtrl.getOneLikefromPost);


module.exports = router;