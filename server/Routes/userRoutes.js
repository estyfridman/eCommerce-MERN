import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { generateToken, isAuth } from "../utiles.js";


const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid Credentials" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {    
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already exists in the database");
      }

      const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
    });

      const user = await newUser.save();
      //const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);

      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
);


//testing 
userRouter.get("/", isAuth, async (req, res) => {
    res.status(200).send({message: "Welcome"});
});

export default userRouter;

