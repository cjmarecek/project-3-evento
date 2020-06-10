const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./usersModel");
const { validateSignupData, validateLoginData } = require("./usersValidators");

exports.signup = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
    isAdmin: false,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  const noImg = "no-img.png";

  try {
    // check if email exists
    const doc = await User.find({ email: newUser.email });
    if (doc[0]) return res.status(409).json({ email: "This mail already belogs to somebody." });

    // check if username exists
    const doc1 = await User.find({ username: newUser.username });
    if (doc1[0]) return res.status(409).json({ username: "This username already belongs to somebody." });

    const hash = bcrypt.hashSync(newUser.password, 10);
    const user = new User({
      email: newUser.email,
      password: hash,
      username: newUser.username,
      isAdmin: false,
      image: "http://localhost:1337api/events/uploads/" + noImg,
    });
    const savedUser = await user.save();
    if (savedUser)
      res.status(201).json({
        message: "User created",
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        general: "Something went wrong, please try again",
        error: error,
      });
  }
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
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
