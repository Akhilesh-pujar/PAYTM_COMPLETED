const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization; 
    if(authToken){
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }else{
        res.status(403).json({msg: "Authentication failed"})
    }
}

module.exports = authMiddleware;