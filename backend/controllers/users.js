const Users = require("../model/users");
const jwt = require("jsonwebtoken");

export const getAllUsers = async (req, res, next) => {
  const user = await Users.find();
  return res.json({
    user,
  });
};

export const getUserInfo = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;
  const user = await Users.findOne(
    { _id },
    "-_id firstName lastName code phone email avatarUrl"
  );

  return res.json({
    user,
  });
};

/**
 * Login function
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const loginAuthen = async (req, res) => {
  const userPost = { ...req.body };
  const user = await Users.findOne(
    {
      email: userPost.email,
      password: userPost.password,
    },
    "_id firstName lastName code "
  );
  if (!user) {
    return res.status(401).send({ message: "Login failed!" });
  }
  const accessToken = jwt.sign(
    JSON.parse(JSON.stringify(user)),
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3000s",
    }
  );
  return res.json({
    accessToken,
  });
};

export const registerAuthen = async (req, res) => {
  const avatarUrl = req.body.avatarUrl
    ? req.body.avatarUrl
    : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
  const {
    email,
    password,
    phone,
    lastName,
    firstName,
    code,
    // avatarUrl = "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
  } = req.body;
  const existedUser = await Users.findOne({ email }, "-password");
  if (existedUser) {
    return res.status(401).send({ message: "Email existed!" });
  }
  console.log("avatarUrl", avatarUrl);
  try {
    await Users.create({
      email,
      password,
      phone,
      lastName,
      firstName,
      code,
      avatarUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }

  return res.status(201).send({
    userInfo: {
      email,
      phone,
      lastName,
      firstName,
      code,
      avatarUrl,
    },
  });
};

export const updateInfo = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;

  const { firstName, lastName, phone, avatarUrl } = req.body;

  await Users.updateOne({ _id }, { firstName, lastName, phone, avatarUrl });
  return res.json({});
};

export const updatePassword = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;

  const { oldPassword, newPassword, reNewPassword } = req.body;

  const checkPassword = Users.findOne({
    password: oldPassword,
  });

  console.log(checkPassword);

  if (!checkPassword) {
    return res
      .status(401)
      .send({ message: "New password not match with old password" });
  }

  await Users.updateOne({ _id }, { password: newPassword });

  return res.json({});
};
