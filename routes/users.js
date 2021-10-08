var express = require("express");
var router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

//  Register new User---------------------------------------------------
router.post("/register", function (req, res, next) {
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

// logging in the user--------------------------------------------------
router.post('/login', async (req, res) => {
  // check if username and password are entered
  if (!req.body.username || !req.body.password) {
    res.status(422).json({
      error: "Must Include username and password",
    });
    return
  }
  // find user by username----------------------------------------------
  const user = await db.User.findOne({
    where: {
      username: req.body.username
    }    
  })
  if (!user) {
    res.status(400).json({
      error: "Could not find user with that username"
    })
    return
  }
  // check password-----------------------------------------------------
  const success = await bcrypt.compare(req.body.password, user.password)

  if (!success) {
    res.status(401).json({
      error: 'Incorrect password'
    })
  }
  // login the user-----------------------------------------------------
  req.session.user = user
  // extract password from user user, assign all other properties to the userData variable
  const { password, ...userData } = user.dataValues

  // respond with success-----------------------------------------------
  res.json({
    success: 'You have successfully logged in',
    user: userData
  })
})

// logout
router.get('/logout', (req,res) =>{
  req.session.user = null
  res.json({
    success: 'user logged out'
  })
})

// current user
router.get('/current', async (req, res) => {
  const user = await db.User.findByPk(req.session.user.id)
  if(!user) {
    res.status(404).json({
      error: 'not logged in'
    })    
  }
  const { password, ...userData } = user.dataValues

  res.json(userData)

})



module.exports = router;
