var express = require("express");
var router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

//  Register new User
router.post("/", function (req, res, next) {
  //  take username, password
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(422).json({
      error: "Must Include username and password",
    });
    return
  }
  //  check if username is unique
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        error: "username is already in use",
      });
      return;
    } // hash password store in db
    bcrypt.hash(req.body.password, 10).then((hash) => {
      //store user details
      db.User.create({
        username: req.body.username,
        password: hash,
      }).then((user) => {
        //respond with success
        res.status(201).json({
          success: "Successfully Registered",
        });
      });
    });
  });

  // respond with success/error
});

module.exports = router;
