const express = require('express');
var router = express.Router()

// Display the editors page
router.get("/", async function(req, res) {
  //checking log in and access
  if (req.session.username && req.session.access_level === "editor") {
      res.render("editors", req.TPL);
  } else {
      res.redirect("/home");
  }
});

module.exports = router;
