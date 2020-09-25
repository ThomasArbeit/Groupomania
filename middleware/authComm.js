const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userRole = decodedToken.role;
    const userId = decodedToken.userId;
    Comment.findAll({
        where: {
            commentId: req.params.id
        }
    })
    .then(comment => {
        if((comment[0].commentor_Id === userId) || userRole === 1){
            next();
        }
        else{
            res.status(403).json({message: 'Vous ne pouvez pas le supprimer'})
        }
    })
    .catch(error => res.status(500).json({error}))
}