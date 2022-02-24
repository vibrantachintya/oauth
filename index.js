const express = require("express");
const app = express();
const User = require("./src/modules/user.module");
const { login, register, newToken } = require("./src/controllers/auth.controller");
//const passport = require("./configs/google-oauth");

const productController = require("./src/controllers/product.controller");

app.use(express.json());

const connect = require("./src/configs/db");

app.listen(8080, async () => {
    try {
        await connect();
        console.log("Listening on 2345");
    } catch(e) {
        console.log(e.message);
    }
});

app.get("/", async(req, res) => {
    const users = await User.find().lean().exec();
        return res.status(200).send({users});
        
       /*return res.json({
      status: 200,
      message: "Get data has successfully",
    });*/
         });

app.use("/products", productController);
