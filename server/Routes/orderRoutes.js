import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import { isAuth } from "../utiles.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      // Trying to get items properly
      // const orderItems = req.body.orderItems.map((item) => ({
      //   price: item.price,
      //   image: item.image,
      //   quantity: item.quantity,
      //   title: item.title,
      //   token: item.token,
      //   product: item._id,
      // }));

      const newOrder = new Order({
        orderItems: req.body.orderItems.map((i) => ({ ...i, product: i._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const order = await newOrder.save();
      res.status(201).send({ message: "Order created", order });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      res.send(order);
    }
    else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

export default orderRouter;
