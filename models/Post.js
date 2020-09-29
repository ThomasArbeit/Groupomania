const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = require('../models/User');

const Post = sequelize.define('Post', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
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

Post.belongsTo(User, {foreignKey: 'creator_Id', onDelete:'cascade'});
User.hasMany(Post, {foreignKey: 'creator_Id', onDelete:'cascade'});

Post.sync()
.then(() => console.log('La table Post a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Post;