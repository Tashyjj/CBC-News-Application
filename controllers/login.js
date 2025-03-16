const express = require('express');
var router = express.Router()
const Users = require('../models/users');

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
  const { username, password } = req.body;

  Users.findByUsernameAndPassword(username, password, (err, user) => {
      if (err) {
          console.error('Database error:', err);
          req.session.login_error = "couldnt log in";
          return res.redirect("/login");
      }

      if (user) {
          //giving them the name and usr level
          req.session.username = user.username;
          req.session.access_level = user.level;

          //members go to members editors go to editors etc
          if (user.level === "member") {
              res.redirect("/members");
          } else if (user.level === "editor") {
              res.redirect("/editors");
          } else {
              //maybe the user is a dinosaur, or a hacker
              req.session.login_error = "get out of here dinosaur!";
              res.redirect("/login");
          }
      } else {
          //IF they dont exist, wah wah
          req.session.login_error = "Invalid username and/or password! (wah wah)";
          res.redirect("/login");
      }
  });

//commenting this bc I can never delete our beloved professors code !!

  // // is the username and password OK?
  // if (req.body.username == "bob" &&
  //     req.body.password == "test")
  // {
  //   // set a session key username to login the user
  //   req.session.username = req.body.username;

  //   // re-direct the logged-in user to the members page
  //   res.redirect("/members");
  // }
  // else
  // {
  //   // if we have an error, reload the login page with an error
  //   req.session.login_error = "Invalid username and/or password!";
  //   res.redirect("/login");
  // }

});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res) {
  delete req.session.username;
  delete req.session.access_level;
  res.redirect("/home");
});

module.exports = router;

