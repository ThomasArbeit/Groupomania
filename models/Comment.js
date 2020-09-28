const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = require('../models/User');
const Post = require('../models/Post');

const Comment = sequelize.define('Comment', {
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    }
});

User.hasMany(Comment, {foreignKey: 'commentor_Id', onDelete: "cascade"});
Comment.belongsTo(User, {foreignKey: 'commentor_Id', onDelete: "cascade"});
Post.hasMany(Comment, {foreignKey: "post_Id", onDelete: "cascade"});
Comment.belongsTo(Post, {foreignKey: "post_Id", onDelete: "cascade"});



Comment.sync()
.then(() => console.log('La table Comment a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Comment;