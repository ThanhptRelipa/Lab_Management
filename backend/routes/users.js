const express = require("express");
const {
  getAllUsers,
  createUser,
  loginAuthen,
  logoutAuthen,
  authenToken,
} = require("../controllers/users");
const router = express.Router();

router.route("/users").get(authenToken, getAllUsers);

router.route("/users").post(createUser);

router.route("/login").post(loginAuthen);

module.exports = router;
