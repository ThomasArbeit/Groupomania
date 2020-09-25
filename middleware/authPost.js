const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userRole = decodedToken.role;
    Post.findAll({
        where: {
            postId: req.params.id
        }
    })
    .then(post => {
        console.log(post[0].creator_Id);
        console.log(req.body.userId);
        if((post[0].creator_Id === req.body.userId) || userRole === 1){
            next();
        }
        else{
            res.send('Vous ne pouvez pas le supprimer')
        }
    })
    .catch(error => res.send("Une erreur est survenue", +error))
}