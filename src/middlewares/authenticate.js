require("dotenv").config();
const jwt = require("jsonwebtoken");


const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) return reject(err);
            resolve(user);
        });
    });
}

module.exports = async (req, res, next) => {

    if(!req.headers.authorization)
        return res.status(400).send({message: "No Auth header"});

    if(!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({message: "Invalid Auth header"});

    const token = req.headers.authorization.split(" ")[1];

    let user;

    try {
        user = await verifyToken(token);
    } catch(e) {
        return res.status(400).send({message: "Invalid Auth header"});
    }

    req.user = user.user;

    return next();
};