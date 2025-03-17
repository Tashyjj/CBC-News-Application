const express = require('express');
var router = express.Router();

const Users = require('../models/users');
const Articles = require('../models/articles');
const editorAuthMiddleware = require('../middleware/editorAuthMiddleware');

//seeing all articles
router.get("/", editorAuthMiddleware, async function(req, res) {
    try {
        
        const users = await Users.getAllUsers();
        const articles = await Articles.getAllArticles();

        
        req.TPL.users = users;
        req.TPL.articles = articles;

        
        res.render("editors", req.TPL);
    } catch (err) {
        console.error("Error fetching data:", err);
        req.TPL.message = "An error occurred while fetching data.";
        res.render("editors", req.TPL);
    }
});

//deleting articles
router.get("/delete-article/:id", editorAuthMiddleware, async function(req, res) {
    const articleId = req.params.id;

    try {
        //delete it from the db
        await Articles.deleteArticle(articleId);
        res.redirect("/editors");
    } catch (err) {
        console.error("Error deleting article:", err);
        req.TPL.message = "An error occurred while deleting the article.";
        res.render("editors", req.TPL);
    }
});

//deleting users
router.get("/delete-user/:username", editorAuthMiddleware, async function(req, res) {
    const username = req.params.username;

    try {
        //deleting the user and their articles
        await Users.deleteUser(username);
        await Articles.deleteArticlesByAuthor(username);
        res.redirect("/editors");
    } catch (err) {
        console.error("Error deleting user:", err);
        req.TPL.message = "An error occurred while deleting the user.";
        res.render("editors", req.TPL);
    }
});

module.exports = router;