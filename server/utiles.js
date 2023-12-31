import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, 
      name: user.name, 
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
      jwt.verify(authorization, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }else {
        req.user = decode;
        next();
      } });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

