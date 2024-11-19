const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    };
    try {
        const decoded = jwt.verify(token, process.env.SIGNATURE); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({error: 'Invalid or expired token'});
    }; 
};

module.exports = verifyToken;