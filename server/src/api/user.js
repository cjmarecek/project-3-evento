const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const emailCheck = await User.find({ email: req.body.email }).exec()

  } catch (error) {
    
  }
  
      if (emailCheck.length >= 1) {
        return res.status(422).json({ message: "mail exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              //todo hash confirmPassword
              confirmPassword: hash,
              username: req.body.username,
              image: req.body.image,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({ message: "User created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(404).json({ message: "Auth failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            message: "Auth successfull",
            token: token,
          });
        }
        return res.status(404).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(() => {
      res.status(201).json({ message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
