const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getCommentsfromPost = (req, res, next) => {
    console.log(req.params.id);
    Comment.findAll({
        where: {post_Id: req.params.id},
        include: [{model: User, as: 'user_Id'}]
    })
    
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}));
};

exports.createOneComment = (req, res, next) => {
    Comment.create({
        post_Id: req.params.id,
        commentor_Id: req.body.userId,
        content: req.body.content
    })
    .then(() => res.status(201).json({message:'Post crée'}))
    .catch(error => res.status(400).json({error}));
};