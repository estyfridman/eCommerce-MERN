import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

import data from "../data.js";


const seedRouter = express.Router();

seedRouter.get("/", async (req, res, next) => {
    try {
        await Product.deleteMany({}); // delete all products
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