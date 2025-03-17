function editorAuthMiddleware(req, res, next) {
    //checking login and access
    if (req.session.username && req.session.access_level === "editor") {
        //if editor allow access
        next();
    } else {
        //hes not allowed in here
        res.redirect("/home");
    }
}

module.exports = editorAuthMiddleware;