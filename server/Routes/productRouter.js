import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utiles.js";
import Product from "../models/ProductModel.js";

const productRouter = express.Router();
const PAGE_SIZE = 6;

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get(
  "/token/:token",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    const product = await Product.findOne({ token: token });
    product
      ? res.send(product)
      : res.status(404).send({ message: "Product not found" });
  })
);

productRouter.get(
  "/id/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById({ id });
    product
      ? res.send(product)
      : res.status(404).send({ message: "Product not found" });
  })
);

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.searchQuery || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { title: { $regex: searchQuery, $options: "i", }, }
        : {};
    const categoryFilter =
      category && category !== "all"
        ? { title: { $regex: category, $options: "i" } }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const ratingFilter =
      rating && rating !== "all" ? { "rating.rate": { $gte: Number() } } : {};
    
      const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: 1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
            
    }).sort(sortOrder).skip((page - 1) * pageSize).limit(pageSize);

    const countProduct = products.length;
    res.send({products, page, countProduct, pages:Math.ceil(countProduct / pageSize)});
  })
);

productRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newProduct = new Order({
        orderItems: req.body.orderItems.map((item) => ({
          //...item,  //todo: this problem
          product: item._id,
        })),
      });
      const Product = await newProduct.save();
      res.status(201).send({ message: "Order created", Product });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

export default productRouter;
