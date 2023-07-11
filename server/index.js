const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwtoken = require("jsonwebtoken");
const UserModel = require("./models/user.js");
const Product = require("./models/Product.js");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const app = express();
const bcryptSalt = bcrypt.genSalt(10);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // process.env.CLIENT_URL
  })
);

const port = 8040;

mongoose.set("strictQuery", false);
mongoose.connect( "mongodb+srv://Director:DirectorIsu0@ecommercecluster.r4g6ivl.mongodb.net/EstyEcommerce?retryWrites=true&w=majority");

const reconnectToProductDatabase = async () => {
  try {
    await mongoose.disconnect();
    await mongoose.connect(
      "mongodb+srv://Director:DirectorIsu0@ecommercecluster.r4g6ivl.mongodb.net/EstyEcommerce?retryWrites=true&w=majority"
    );
    console.log("Reconnected to the database");
  } catch (error) {
    console.error("Error reconnecting to the database:", error);
  }
};

app.post("/products", async (req, res) => {

  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(200).json(product);
    res.send({ message: "Product created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
  reconnectToProductDatabase();
});

app.get("/products", async (req, res) => {

  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/", (req, res) => res.send("hellow esty!!"));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email }).exec();
    if (existingUser) {
      res.send({ message: "Email id is already registered" });
    } else {
      const newUser = await UserModel.create({
        name,
        email,
        password,
      });
      console.log(newUser);
      res.send({ message: "Successfully registered" });
    }
  } catch (error) {
    console.log(error);
    //res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.listen(8040, () => {
  console.log(`Server started`);
});
