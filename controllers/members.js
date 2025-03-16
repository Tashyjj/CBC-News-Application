const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", async function(req, res) {
  //make sure theyre logged in
  if (!req.session.username) {
      return res.redirect("/home");
  }
  
  try {
    //getting all articles
    const articles = await ArticlesModel.getAllArticles();
    req.TPL.articles = articles;
    res.render("members", req.TPL);
  } catch (err) {
    console.error("Error fetching articles:", err);
    req.TPL.message = "An error occurred while fetching articles.";
    res.render("members", req.TPL);
  }

});

// Create an article if the form has been submitted
router.post("/create", async function(req, res)
{
  //again make sure theyre logged in
  if (!req.session.username) {
    return res.redirect("/home");
  }

  try {
    //using the logged in users name to create the article
    await ArticlesModel.createArticle(req.body, req.session.username);

    req.TPL.message = "Article successfully created!";
    res.render("members", req.TPL);
  } catch (err) {
    console.error("Error writing article:", err);
    req.TPL.message = "An error occurred while making the article.";
    res.render("members", req.TPL);
  }
});

module.exports = router;
