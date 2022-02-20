require("dotenv").config();
const User = require("../modules/user.module");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
};

const login = async (req, res) => {
    try {

        let user = await User.findOne({email: req.body.email});

        if(!user) return res.status(400).send({message: "Email not exists"});

        const match = user.matchPassword(req.body.password);

        if(!match) return res.status(400).send({message: "Invalid password"});

        const token = newToken(user);

        return res.status(200).send({user, token});

    } catch(e) {
        console.log(e.message);
    }
};

const register = async (req, res) => {
    try {

        let user = await User.findOne({email: req.body.email}).lean().exec();

        if(user) return res.status(400).send({message: "Email exists"});

        user = await User.create(req.body);

        const token = newToken(user);

        return res.status(200).send({user, token});

    } catch(e) {
        console.log(e.message);
    }
};

module.exports = {login, register, newToken}