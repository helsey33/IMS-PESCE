const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegister = require("./../../validation/register");
const validateLogin = require("./../../validation/login");
//Import models
const User = require("../../models/User");

router.get("/", (req, res) => res.json({ msg: "user works" }));

//@routes POST /register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists.";
      return res.status(400).json(errors);
    }
    //Save user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  token: "Bearer " + token
                });
              }
            );
          })
          .catch(err => console.log(err));
      });
    });
  });
});

//@routes POST /login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).send(errors);
    }

    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };
          jwt.sign(
            payload,
            keys.secret,
            { expiresIn: 3600 * 24 * 7 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password Incorrect";
          res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
