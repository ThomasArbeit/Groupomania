// Initialisation de dotenv
require('dotenv').config()

// Initialisation des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Récupération des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

//Initialisation de l'application avec le framework express
const app = express();


// Connection à la database
const { Sequelize, DataTypes, Model } = require('sequelize');
const { urlencoded } = require('body-parser');
const { addHook } = require('./models/User');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Test de la connection
sequelize.authenticate()
.then(() => console.log('Connection to the database has been established succesfully.'))
.catch(error => console.error('Unable to connect do the database', error));


// Utilisation du body-parser pour les content-type : application/json
app.use(bodyParser.json());


// Utilisation du path pour enregistrer les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisation des routes 
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);



// Export de app pour le fichier server.js
module.exports = app;