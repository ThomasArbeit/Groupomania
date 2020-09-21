const { Sequelize } = require('sequelize');
const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: sequelize.literal('(createdAt) DESC'),
        include: [{model: User, as: 'user_Id'}]
    })
    
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
};

exports.createOnePost = (req, res, next) => {
    Post.create({
        creator_Id: req.body.userId,
        content: req.body.content,
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
    Post.findAll({ where: {postId: req.params.id}, include: [{model: User, as: 'user_Id'}]})
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