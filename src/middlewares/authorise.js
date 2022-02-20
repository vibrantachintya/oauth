const Product = require("../modules/product.module");

module.exports = function(roles) {
    return async function(req, res, next) {
        let user = req.user;
        let isPermitted = false;
        roles.map((role) => {
            if(user.roles.includes(role)) isPermitted = true;
        });

        try {
            const product = await Product.findById(req.params.id).lean().exec();
            if(product.user_id == user._id)
                isPermitted = true;
            else isPermitted = false;
        } catch(e) {
            console.log(e.message);
        }


        if(!isPermitted)
            return res.status(403).send({message: "Permission Denied"})
        return next();
    };
};