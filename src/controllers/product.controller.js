const express = require("express");

const Product = require("../modules/product.module");
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
    try {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            user_id: req.user._id
        });
        return res.status(200).send({product});
    } catch(e) {
        console.log(e.message);
    }
});

router.get("", async (req, res) => {
    try {
        const products = await Product.find().lean().exec();
        return res.status(200).send({products});
    } catch(e) {
        console.log(e.message);
    }
});

router.patch("/:id", authenticate, authorise(["seller", "admin"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec();
        return res.status(200).send({product});
    } catch(e) {
        console.log(e.message);
    }
});

router.delete("/:id", authenticate, authorise(["seller", "admin"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({product});
    } catch(e) {
        console.log(e.message);
    }
});

module.exports = router;