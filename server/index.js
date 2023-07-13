import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import seedRouter from "./Routes/seedRoutes.js";

dotenv.config();
const port = process.env.PORT || 8040;

const app = express();
app.use(cors());  
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

//"mongodb+srv://Director:DirectorIsu0@ecommercecluster.r4g6ivl.mongodb.net/EstyEcommerce?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(port);
  console.log(`Server started`);
}).catch((err) => console.log(err));

