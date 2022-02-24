const express = require("express");
const app = express();
const { login, register, newToken } = require("./controllers/auth.controller");
//const passport = require("./configs/google-oauth");

const productController = require("./controllers/product.controller");

app.use(express.json());

const connect = require("./configs/db");

app.listen(8080, async () => {
    try {
        await connect();
        console.log("Listening on 2345");
    } catch(e) {
        console.log(e.message);
    }
});

app.get("/", async(req, res) => {
        
       return res.json({
      status: 200,
      message: "Get data has successfully",
    });
         });

app.post("/login", login);

app.post("/register", register);

app.use("/products", productController);

/*passport.serializeUser(function (user, done) {
    done(null, user);
});
  
passport.deserializeUser(function (user, done) {
    done(null, user);
});
  
app.get("/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
  
app.get("/auth/google/callback",
    passport.authenticate("google", {failureRedirect: "/auth/google/failure"}), (req, res) => {
      const { user } = req;
      const token = newToken(user);
      return res.send({ user, token });
    }
);*/
