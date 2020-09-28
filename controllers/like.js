const { sequelize } = require('../models/Post');
const { Op } = require('sequelize');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');


exports.moderateLikes = (req, res, next) => {
    console.log(req.body.likes)
    // Je cherche le like correspondant à l'userId de celui qui le demande et au post
    Like.findAll({
        where:{
            post_Id: req.params.id,
            liker_Id: req.body.userId
        }
    })
    .then(like => {
        // A Partir du like trouvé (sous forme de tableau)
        if(like[0] === undefined){ // Si le like n'est pas trouvé
        console.log(req.body.likes)
            if (req.body.likes == 1){ // Et que likes envoyé depuis le front est égal à 1, on ajout une instance au tableau des likes
                Like.create({
                    liker_Id: req.body.userId,
                    post_Id: req.params.id
                })
                .then(() => res.status(201).json({message: ' a bien liké le post '}))
                .catch(error => res.status(400).json({error}));
                
            } else { // Si likes vaut une autre valeur
                res.status(403).json({message: 'Vous ne pouvez pas annuler votre like'})
            }
        } else {  // Si le like a été trouvé dans la table des likes
            if (req.body.likes == 0){ // Et que le like envoyé depuis le front est égal à 0 on supprime l'instance de la table likes
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
                
            } else { // Si la valeur de like correspond à une valeur autre que 0 alors on renvoie une erreur
                res.status(403).json({ message: 'Vous ne pouvez pas liker à nouveau ce post' })
            }
        }
    })
    .catch(error => res.status(500).json({ error }));
}



exports.getLikesfromPost = (req, res, next) => {
    console.log(req.params.id);
    Like.findAll({
        where: {post_Id: req.params.id}
    })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(400).json({error}));
};
