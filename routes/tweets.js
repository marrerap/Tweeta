var express = require("express");
var router = express.Router();
const db = require("../models");

// get all tweets
router.get("/", async function (req, res, next) {
  //  find all tweets
  const tweets = await db.Tweet.findAll({
    include: [{
      model: db.User,
      attributes: ["username"]
    }]
  });
  // send them to front end
  res.send(tweets);
});

router.post("/", async function (req, res, next) {
  // content, user
  if (!req.body.content) {
    res.status(400).json({
      error: "Tweet content cannot be empty",
    });
    return;
  }

  // find logged in user
  const user = await db.User.findByPk(req.session.user.id)


  // create new tweet
  const tweet = await user.createTweet({
    content: req.body.content
  })


  // send back response
  res.json(tweet)
});

module.exports = router;
