const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
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
    creator_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
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

Post.belongsTo(User, {as: 'user_Id', foreignKey: 'creator_Id'});

Post.associate = models => {
    Post.hasMany(models.Comment, {
        onDelete: 'cascade'
    })
}

/*Post.sync({alter: true})
.then(() => console.log('La table Post a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));*/


module.exports = Post;