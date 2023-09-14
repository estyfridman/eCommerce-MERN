import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import seedRouter from "./Routes/seedRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import productRouter from "./Routes/productRouter.js";

dotenv.config();
const port = process.env.PORT || 8040;

const app = express();
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}).catch((err) => console.log(err.message));

