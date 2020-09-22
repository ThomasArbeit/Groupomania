const { sequelize } = require('../models/Post');
const { Op } = require('sequelize');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

exports.createOneLike = (req, res, next) => {
    Like.create({
        liker_Id: req.body.userId,
        post_Id: req.params.id
    })
    .then(() => res.status(201).json({message: ' a bien liké le post '}))
    .catch(error => res.status(400).json({error}));
}

exports.deleteOneLike = (req, res, next) => {
    console.log("je cherche le liker_Id :", req.body.userId)
    Like.destroy({
        where: {
             liker_Id: req.body.userId, 
             post_Id: req.params.id
        }
    })
    .then(() =>{
        res.status(200).json({message: "j'ai supprimé le like que vous cherchiez"})
    })
    .catch(error => res.status(400).json({error}));
}

exports.getLikesfromPost = (req, res, next) => {
    console.log(req.params.id);
    Like.findAll({
        where: {post_Id: req.params.id}
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};