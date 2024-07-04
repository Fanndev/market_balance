const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { compareSync } = require("bcrypt");
const { where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// user auth Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Notrequired,
    });
  }

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Emailnot,
    });
  }

  // check password
  const isPasswordCorrect = compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Wrongpass,
    });
  }

  // jwt
  const token = jwt.sign({ id: user.user_id }, "market_balance123", {
    expiresIn: "1d",
  });

  return res.status(StatusCode.OK).json({
    message: ResponseMessage.LoginSuccess,
    token,
  });
};

// Register Mobile
exports.register = async (req, res) => {
  const { username, email, password, no_telp } = req.body;

  // Validate user input
  if (!username || !no_telp || !email || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "no_telp, email, dan password dibutuhkan",
    });
  }

  try {
    // Check if email has been used
    const isEmailUsed = await Users.findOne({
      where: { email: email },
    });

    if (isEmailUsed) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Email sudah digunakan",
      });
    }

    // Create new user
    const newUser = await Users.create({
      username: username,
      no_telp: no_telp,
      email: email,
      password: password,
    });

    // Send response with user information
    return res.status(StatusCode.OK).json({
      message: ResponseMessage.SuksesRegistered,
      data: newUser,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.FailRegistered,
      error: error.message,
    });
  }
};