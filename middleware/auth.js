const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        const bodyUserId = parseInt(req.body.userId);
        console.log("this is the userId in the token: ", userId);
        if (bodyUserId && bodyUserId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error:'Requete non authentifiée !'});
    }
};