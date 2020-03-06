const path = require('path');

function addStaticPageRoutes (app) {

    app.get("/", (req, res, next) => {
        res.sendFile(path.resolve (__dirname, "../pages/index.html"));
    });

    app.get("/as-logged-in", (req, res, next) => {
        res.sendFile(path.resolve (__dirname, "../pages/index-logged-in.html"));
    });

    app.get("/sign-up", (req, res, next) => {
        res.sendFile(path.resolve (__dirname, "../pages/sign-up.html"));
    });

    app.get("/login", (req, res, next) => {
        res.sendFile(path.resolve (__dirname, "../pages/login.html"));
    });

    app.get("/my-configs", (req, res, next) => {
        res.sendFile(path.resolve (__dirname, "../pages/my-configs.html"));
    });

}

module.exports = addStaticPageRoutes;