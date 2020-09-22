const { Sequelize } = require('sequelize');
const Like = require('../models/Like');
const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: sequelize.literal('(createdAt) DESC'),
        include: [{model: User}]
    })
    
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
};

exports.createOnePost = (req, res, next) => {
    Post.create({
        creator_Id: req.body.userId,
        content: req.body.content,
        likes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(() => res.status(201).json({message:'Post crée'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteOnePost = (req, res, next) => {
    Post.destroy({ where: {postId: req.params.id}})
    .then(() => res.status(200).json({message: 'Post supprimé '}))
    .catch(error => res.status(400).json({error}));
};

exports.getOnePost = (req, res, next) => {
    Post.findAll({ where: {postId: req.params.id}, include: [{model: User}]})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.modifyOnePost = (req, res, next) => {
    Post.update({
        content: req.body.content,
        imageUrl: req.body.imageUrl
    },
    {
        where: {
            postId: req.params.id
        }
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.Likes = (req, res, next) => {
    console.log(req.body.likes)
    if (req.body.likes == 1){
        Post.update({
            likes: sequelize.literal('likes+1')
        },
        {
            where: {
                postId: req.params.id
            }
        })
        .then(() => res.status(200).json({message: 'Post liké'}))
        .catch(error => res.status(400).json({error}));
    } else if (req.body.likes == 0){
        Post.update({
            likes: sequelize.literal('likes-1')
        },
        {
            where: {
                postId: req.params.id
            }
        })
        .then(() => res.status(200).json({message: 'like annulé'}))
        .catch(error => res.status(400).json({error}));
    }
}