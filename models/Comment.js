const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
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
    commentor_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    post_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'postId'
        }
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

Comment.belongsTo(User, {as: 'user_Id', foreignKey: 'commentor_Id'});
Comment.belongsTo(Post, {as: 'postId', foreignKey: 'post_Id'});

/*Comment.sync({force: true})
.then(() => console.log('La table Comment a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));*/

module.exports = Comment;