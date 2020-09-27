const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userRole = decodedToken.role;
    const userId = decodedToken.userId
    Post.findAll({
        where: {
            postId: req.params.id
        }
    })
    .then(post => {
        if((post[0].creator_Id === userId) || userRole === 1){
            next();
        }
        else{
            res.status(403).json({message: "Vous n'êtes pas autoriser à faire cette action"})
        }
    })
    .catch(error => res.send("Une erreur est survenue", error))
}