const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid Authentication Credentials",
        });
      });
  });
};

exports.loginUser = (req, res, next) => {
  let fetchUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed !!!",
        });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication Failed !!!",
        });
      }
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid Authentication Credentials !!!",
      });
    });
};
