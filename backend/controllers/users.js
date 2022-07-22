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
    "-_id firstName lastName code phone email"
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
  const { email, password, phone, lastName, firstName, code } = req.body;
  const existedUser = await Users.findOne({ email }, "-password");
  if (existedUser) {
    return res.status(401).send({ message: "Email existed!" });
  }
  try {
    await Users.create({
      email,
      password,
      phone,
      lastName,
      firstName,
      code,
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
    },
  });
};
