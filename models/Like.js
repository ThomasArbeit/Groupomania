const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = require('../models/User');
const Post = require('../models/Post');

const Like = sequelize.define('Like', {
    likeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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

User.hasMany(Like, {foreignKey: 'liker_Id', onDelete: "cascade"});
Like.belongsTo(User, {foreignKey: 'liker_Id', onDelete: "cascade"});
Post.hasMany(Like, {foreignKey: "post_Id", onDelete: "cascade"});
Like.belongsTo(Post, {foreignKey: "post_Id", onDelete: "cascade"});

Like.sync()
.then(() => console.log('La table Like a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Like;