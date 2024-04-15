const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json("You are not logged in.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(400).json("Invalid token.");
        }

        req.userId = user.id;
        next();
    }
    );
}


module.exports = verifyToken;