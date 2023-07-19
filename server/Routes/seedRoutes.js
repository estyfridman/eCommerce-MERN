import express from "express";

import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res, next) => {
    try {
        await Product.deleteMany({});
        await Order.deleteMany({});
        await User.deleteMany({});

        const createProduct = await Product.insertMany(data.products);
        const createUser = await Product.insertMany(data.users);

        res.send({createProduct, createUser});
    } catch (error) {
        console.log("failed to delete" + error.message);
    }
});


export default seedRouter;