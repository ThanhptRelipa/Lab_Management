const Users = require("../model/users");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  console.log(req.body);
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
    return res.send({ message: "Login failed!" });
  }
  return res.json({
    accessToken,
  });
};

exports.authenToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    next();
  });
};

exports.logoutAuthen = async (req, res, next) => {
  const refreshToken = req.body.token;
  refreshToken.filter();
};
