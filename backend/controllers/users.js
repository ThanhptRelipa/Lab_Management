const Users = require("../model/users");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  console.log(req.body);
  const email = await Users.find({ email: req.body.username });
  if (email) {
    return res.json({ message: "Da ton tai!" });
  }
  const user = await Users.create(req.body);
  return res.json({
    user,
  });
};
exports.getAllUsers = async (req, res, next) => {
  const user = await Users.find();
  return res.json({
    user,
  });
};
exports.loginAuthen = async (req, res, next) => {
  const userPost = { ...req.body };
  const accessToken = jwt.sign(userPost, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "300s",
  });
  const user = await Users.findOne({
    username: userPost.username,
    password: userPost.password,
  });
  if (!user) {
    return res.status(401).send({ message: "Login failed!" });
  }
  return res.json({
    accessToken,
  });
};
