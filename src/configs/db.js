const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://achintya:db1234@cluster0.cga5s.mongodb.net/library?retryWrites=true&w=majority");
};

module.exports = connect;