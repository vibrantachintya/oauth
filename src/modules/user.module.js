const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        "name" : {type: String, required: true},
        "email" : {type: String, require: true},
        "password" : {type: String, required: true},
        "roles" : [{type: String, enum: ["customer", "seller", "admin"], required: true}] 
    }, 
    {
        versionKey: false,
        timestamps: true
    }
);

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next();

    var hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.matchPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
};


const User = mongoose.model("user", userSchema);

module.exports = User;